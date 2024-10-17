// src/strategy.js
function shouldBuy(priceChange) {
  // Allowing a slight margin for floating point errors (like -2.00001)
  return priceChange <= parseFloat(process.env.BUY_THRESHOLD) + 0.0001;
}

function shouldSell(priceChange) {
  // Allowing a slight margin for floating point errors (like 3.00001)
  return priceChange >= parseFloat(process.env.SELL_THRESHOLD) - 0.0001;
}

module.exports = { shouldBuy, shouldSell };
