require('dotenv').config();
const { getStockPrices } = require('./api');
const { shouldBuy, shouldSell } = require('./strategy');

let balance = parseFloat(process.env.INITIAL_BALANCE);
let stocksOwned = 0;
let tradeHistory = [];

console.log("Initial balance:", balance); // Debugging line

async function runBot() {
  const prices = await getStockPrices();
  console.log("Fetched prices:", prices); // Debugging line

  if (!prices) return;

  for (let i = 1; i < prices.length; i++) {
    const priceChange = ((prices[i] - prices[i - 1]) / prices[i - 1]) * 100;
    console.log(`Price change between ${prices[i - 1]} and ${prices[i]}:`, priceChange); // Debugging line

    // Buy logic
    if (shouldBuy(priceChange)) {
      console.log(`Buy condition met: Price Change = ${priceChange}, Price = ${prices[i]}, Balance = ${balance}`);
    } else {
      console.log(`Buy condition not met: Price Change = ${priceChange}`);
    }

    if (shouldBuy(priceChange) && balance >= prices[i]) {
      const stockAmount = Math.floor(balance / prices[i]);
      balance -= stockAmount * prices[i];
      stocksOwned += stockAmount;
      tradeHistory.push({ action: 'BUY', price: prices[i], stockAmount });
      console.log(`Bought ${stockAmount} stocks at ${prices[i]} USD`);
    }

    // Sell logic
    if (shouldSell(priceChange)) {
      console.log(`Sell condition met: Price Change = ${priceChange}, Price = ${prices[i]}, Stocks Owned = ${stocksOwned}`);
    } else {
      console.log(`Sell condition not met: Price Change = ${priceChange}`);
    }

    if (shouldSell(priceChange) && stocksOwned > 0) {
      balance += stocksOwned * prices[i];
      tradeHistory.push({ action: 'SELL', price: prices[i], stockAmount: stocksOwned });
      console.log(`Sold ${stocksOwned} stocks at ${prices[i]} USD`);
      stocksOwned = 0;
    }
  }

  console.log("Final balance:", balance);
  console.log("Trade history:", tradeHistory);
}

function startTradingBot() {
  runBot();
}

// Initial run
startTradingBot();

// Set interval to run every 10 seconds (10000 milliseconds)
setInterval(() => {
  // Use the final balance of the last run as the initial balance for the next run
  console.log("Starting next run with balance:", balance);
  tradeHistory = []; // Reset trade history for the new run
  startTradingBot();
}, 10000);  // 10000 milliseconds = 10 seconds
