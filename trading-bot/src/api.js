// src/api.js
async function getStockPrices() {
  // Simulate stock price changes
  const prices = [100, 102, 98, 101, 99, 103, 104]; // Mock prices
  return prices;
}

module.exports = { getStockPrices };
