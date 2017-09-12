const express = require('express');
const { Counter, register } = require('prom-client');

const server = express();

const unicornCounter = new Counter({
  name: 'unicorns_request_total',
  help: 'Number of unicorns requested',
  labelNames: ['name'],
});

const unicornRating = new Counter({
  name: 'unicorns_rating_total',
  help: 'Number of unicorns requested',
  labelNames: ['name'],
});

server.get('/', (req, res) => {
  res.end('Here be dragons!');
});

server.get('/request/:name', (req, res) => {
  const { name } = req.params;

  unicornCounter.inc({ name });

  res.json({ status: 'ok', message: `Unicorn ${name} requested` });
});

server.get('/rate/:name/:rating', (req, res) => {
  const { name } = req.params;
  let { rating } = req.params;
  rating = Math.min(parseInt(rating, 10), 6);

  unicornRating.inc({ name }, parseInt(rating, 10));

  res.json({ status: 'ok', message: `You rated ${name} with ${rating} points!` });
});

server.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
});

server.get('/metrics/counter', (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.getSingleMetricAsString('test_counter'));
});

// Enable collection of default metrics
require('prom-client').collectDefaultMetrics();

// eslint-disable-next-line no-console
console.log('Server listening to 8080, metrics exposed on /metrics endpoint');
server.listen(8080);
