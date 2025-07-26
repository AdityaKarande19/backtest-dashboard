// backend/server.js
const express = require('express');
const cors = require('cors');
const { simulateBacktest } = require('./backtest');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/backtest', (req, res) => {
  const result = simulateBacktest(req.body.data);
  console.log(req.body.data);
  res.json(result);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));



// // server.js (Entry Point)
// const express = require('express');
// const cors = require('cors');
// const backtest = require('./backtest');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.post('/api/backtest', async (req, res) => {
//   try {
//     const { symbol, timeframe } = req.body;
//     const result = await backtest(symbol, timeframe);
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));