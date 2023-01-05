const net = require('net');

let telnet;
let _return = () => {};
const onData = data => _return(data.toString());

module.exports = {
  connected: false,
  write: command =>
    new Promise(resolve => {
      _return = resolve;
      telnet.write(`${command}\r\n`);
    }),
  async setFreq(frequency) {
    let code = 1;
    if (frequency < 1048) code = 0;
    if (frequency > 1128) code = 2;
    await this.write(`sf 1 ${code} `);
  },
  async getFreq() {
    const response = await this.write(`FreqStat `)
    return +response.split(':')[1].split('MHz')[0].trim()
  },
  async getAmpPhaseCodes() {
    const { amplitude: amp, phase_360: phase } = JSON.parse(await this.write('apd '));
    return { amp, phase };
  },
  connect() {
    return new Promise(resolve => {
      telnet = net.connect({ port: 7, host: '192.168.1.50' }, () => {
        telnet.on('data', onData);
        this.connected = true;
        resolve();
      });
    });
  },
  disconnect() {
    return (
      !telnet ||
      new Promise(resolve => {
        telnet.on('close', () => {
          telnet = null;
          resolve();
        });
        this.connected = false;
        telnet.destroy();
      })
    );
  },
};
