# Trading Bot

This is a simple trading bot built with Node.js. It uses predefined strategies to buy and sell stocks based on market movement.

## How to run

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Run the bot: `npm start` or `node src/tradingBot.js`.

## Trading Strategy

- **Buy** when the stock price drops by 2% or more.
- **Sell** when the stock price rises by 3% or more.

The bot tracks the balance and logs each trade.

## Environment Variables

- `INITIAL_BALANCE`: Starting balance for the bot.
- `BUY_THRESHOLD`: The percentage drop required to buy stocks.
- `SELL_THRESHOLD`: The percentage rise required to sell stocks.
