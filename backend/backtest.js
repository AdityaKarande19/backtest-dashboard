// backend/backtest.js
function simulateBacktest(data) {
  let balance = 10000;
  let position = null;
  let entryPrice = 0;

  data.forEach((point) => {
    if (point.buySignal && !position) {
      position = 'long';
      entryPrice = point.close;
    }

    if (point.sellSignal && position === 'long') {
      const profit = point.close - entryPrice;
      balance += profit;
      position = null;
    }
  });

  return { finalBalance: balance };
}

module.exports = { simulateBacktest };


// // backtest.js (Mock Backtest Engine)
// const fs = require('fs');
// const path = require('path');

// module.exports = async function backtest(symbol, timeframe) {
//   // Load mock historical data
//   const filePath = path.resolve(__dirname, 'data', `${symbol}_${timeframe}.json`);
//   if (!fs.existsSync(filePath)) throw new Error('Historical data file not found');

//   const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

//   let inPosition = false;
//   let profit = 0;
//   let entryPrice = 0;

//   for (let i = 5; i < data.length; i++) {
//     const close = data[i].close;
//     const ma1 = sma(data.slice(i - 5, i).map(x => x.close));

//     if (!inPosition && close > ma1) {
//       entryPrice = close;
//       inPosition = true;
//     } else if (inPosition && close < ma1) {
//       profit += close - entryPrice;
//       inPosition = false;
//     }
//   }

//   return { symbol, timeframe, profit };
// };

// function sma(arr) {
//   const sum = arr.reduce((a, b) => a + b, 0);
//   return sum / arr.length;
// }