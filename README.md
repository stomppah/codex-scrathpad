# Shopify MTG Card Search Plugin

This repository contains a Shopify theme app extension block that adds a Magic: The Gathering card search UI to product pages.

## Features

- Search by card name (fuzzy matching) using Scryfall API.
- Displays:
  - Card image
  - Collector number
  - Set name and code
  - Scryfall card ID
  - EUR price (commonly aligned with Cardmarket market pricing in Scryfall)
  - USD price (used as a Card Kingdom proxy)

## Files

- `extensions/mtg-card-search/blocks/mtg-card-search.liquid` — block markup, schema, and styles.
- `extensions/mtg-card-search/assets/mtg-card-search.js` — client-side search and rendering logic.

## Notes about pricing sources

Scryfall pricing fields are aggregated and may not map 1:1 to Cardmarket or Card Kingdom listings at all times. If you need direct marketplace-specific prices, add a secure backend proxy and call official APIs for Cardmarket/Card Kingdom with your credentials.

## Local checks

```bash
npm run check
```
