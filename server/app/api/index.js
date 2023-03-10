const { Router } = require('express');
const telnet = require('../utils/telnet');

const api = Router();

api.post('/connect', async (req, res) => {
  if (!telnet.connected) {
    await telnet.connect();
    console.log('telnet'); // eslint-disable-line no-console
  }
  res.sendStatus(201);
});

api.get('/command', async (req, res) => {
  const { command } = req.query;
  const response = await telnet.write(`${command} `);
  res.status(200).send({ response });
});

api.post('/auto_frequency', async (req, res) => {
  await telnet.write(`sf 0 `);
  res.sendStatus(201);
});

api.post('/auto_frequency/off', async (req, res) => {
  const frequency = await telnet.getFreq();
  await telnet.setFreq(frequency);
  res.status(200).send({ frequency });
});

api.post('/manual_frequency', async (req, res) => {
  const { manualFrequency } = req.body;
  await telnet.setFreq(manualFrequency);
  res.sendStatus(201);
});

api.post('/firmware', async (req, res) => {
  await telnet.write(`mp3 0 `);
  res.sendStatus(201);
});

api.post('/manual_codes', async (req, res) => {
  const { ps1, ps2, pd } = req.body;
  await telnet.write(`mp3 1 ${ps1} ${ps2} ${pd} `);
  res.sendStatus(201);
});

api.post('/freeze/on', async (req, res) => {
  await telnet.write(`frz 1 `);
  res.sendStatus(201);
});

api.post('/freeze/off', async (req, res) => {
  await telnet.write(`frz 0 `);
  res.sendStatus(201);
});

module.exports = api;
