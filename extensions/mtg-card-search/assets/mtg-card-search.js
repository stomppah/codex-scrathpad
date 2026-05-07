const SCRYFALL_SEARCH_ENDPOINT = 'https://api.scryfall.com/cards/named?fuzzy=';

function formatPrice(value, currency) {
  if (!value) return 'N/A';
  return `${value} ${currency}`;
}

function renderCard(card) {
  const imageUrl = card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal;
  const cardmarketPrice = formatPrice(card.prices?.eur, 'EUR');
  const cardkingdomPrice = formatPrice(card.prices?.usd, 'USD');

  return `
    <article class="mtg-card-search__result">
      <img src="${imageUrl || ''}" alt="${card.name}" loading="lazy" />
      <dl class="mtg-card-search__meta">
        <dt>Name</dt><dd>${card.name}</dd>
        <dt>Set</dt><dd>${card.set_name} (${card.set?.toUpperCase()})</dd>
        <dt>Card Number</dt><dd>${card.collector_number || 'N/A'}</dd>
        <dt>Scryfall ID</dt><dd>${card.id}</dd>
        <dt>Cardmarket (EUR)</dt><dd>${cardmarketPrice}</dd>
        <dt>Card Kingdom proxy (USD)</dt><dd>${cardkingdomPrice}</dd>
      </dl>
    </article>
  `;
}

async function searchCardByName(name, elements) {
  const { status, results, button } = elements;
  status.textContent = 'Searching…';
  button.disabled = true;

  try {
    const response = await fetch(`${SCRYFALL_SEARCH_ENDPOINT}${encodeURIComponent(name)}`);
    const card = await response.json();

    if (!response.ok || card.object === 'error') {
      throw new Error(card.details || 'Card not found');
    }

    status.textContent = 'Card found.';
    results.innerHTML = renderCard(card);
  } catch (error) {
    status.textContent = error.message;
    results.innerHTML = '';
  } finally {
    button.disabled = false;
  }
}

function initializeMtgCardSearch(container) {
  const input = container.querySelector('[data-mtg-input]');
  const button = container.querySelector('[data-mtg-button]');
  const status = container.querySelector('[data-mtg-status]');
  const results = container.querySelector('[data-mtg-results]');

  const elements = { status, results, button };

  button.addEventListener('click', () => {
    const query = input.value.trim();
    if (!query) {
      status.textContent = 'Please enter a card name.';
      return;
    }

    searchCardByName(query, elements);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      button.click();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('[data-mtg-card-search]');
  containers.forEach((container) => initializeMtgCardSearch(container));
});
