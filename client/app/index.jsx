import React, { Component } from 'react';
import { get, post } from 'axios';
import styled from 'styled-components';
import Command from './containers/command';
import CresControl from './containers/cresControl';

const Container = styled.div`
  display: grid;
  grid:
    'cres response'
    'command response';
  margin: 15px 5px;
  height: 600px;
  gap: 10px;
`;

const ResponseContainer = styled.div`
  grid-area: response;
  font-size: 150%;
`;

const Response = styled.pre`
  border: 1px solid black;
  padding: 10px 10px;
`;

const isNumeric = num => +num === +num; // eslint-disable-line no-self-compare

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      manualFrequency: 150,
      ps1: 0,
      ps2: 0,
      pd: 0,
      delay1: 500,
      delay2: 0,
      command: '',
      codesToggled: false,
      timeSyncToggled: false,
      freezeToggled: false,
    };

    [
      'manualFrequencyEnter',
      'manualEnter',
      'timeEnter',
      'enterCommand',
      'globalStat',
      'inputChange',
      'onToggle',
    ].forEach(funcName => {
      this[funcName] = this[funcName].bind(this);
    });
  }

  async componentDidMount() {
    await post('/api/connect');
    this.setState({ response: 'Connected' });
  }

  onToggle(name) {
    const that = this;
    return async function namedOnToggle() {
      const { [name]: toggle, delay1, delay2, ps1, ps2, pd, codesToggled } = that.state;
      const newState = { [name]: !toggle };
      switch (name) {
        case 'codesToggled':
          if (!toggle) {
            newState.freezeToggled = false;
            await post('/api/manual_codes', { ps1, ps2, pd });
          } else await post('/api/firmware');
          break;
        case 'timeSyncToggled':
          if (!toggle) {
            if (delay2 !== 0 && delay2 < delay1) {
              this.setState({ response: 'Invalid delay 2'})
              return;
            }
            await post('/api/timesync/on', { delay1, delay2 });
          }
          else await post('/api/timesync/off');
          break;
        case 'freezeToggled':
          if (!toggle) {
            if (!codesToggled) await post('/api/freeze/on');
            else newState[name] = toggle;
          } else await post('/api/freeze/off');
          break;
        default:
          break;
      }
      that.setStateAndGlobal(newState);
    };
  }

  async setStateAndGlobal(newState) {
    const {
      data: { response },
    } = await get('/api/command', { params: { command: 'GlobalStat' } });
    newState.response = response; // eslint-disable-line no-param-reassign
    this.setState(newState);
  }

  async globalStat() {
    const {
      data: { response },
    } = await get('/api/command', { params: { command: 'GlobalStat' } });
    this.setState({ response });
  }

  async timeEnter() {
    const { delay1, delay2 } = this.state;
    if (delay2 !== 0 && delay2 < delay1) {
      this.setState({ response: 'Invalid delay 2'})
      return;
    }
    await post('/api/timesync/on', { delay1, delay2 });
    this.setStateAndGlobal({ timeSyncToggled: true });
  }

  async enterCommand() {
    let { command } = this.state;
    command = command.trim();
    const {
      data: { response },
    } = await get('/api/command', { params: { command } });
    const newState = { response };
    if (command.slice(0, 2) === 'sf') newState.manualFrequency = command.slice(3);
    if (command.slice(0, 5) === 'mp3 1') {
      const [ps1, ps2, pd] = command.slice(6).split(' ');
      newState.ps1 = ps1;
      newState.ps2 = ps2;
      newState.pd = pd;
      newState.codesToggled = true;
    }
    if (command.slice(0, 5) === 'mp3 0') newState.codesToggled = false;
    if (command.slice(0, 10) === 'timesync 1') {
      [newState.delay1, newState.delay2] = command.slice(11).split(" ");
      if (newState.delay2 === 0 || newState.delay2 >= newState.delay1) newState.timeSyncToggled = true;
    }
    if (command.slice(0, 10) === 'timesync 0') newState.timeSyncToggled = false;
    if (command === 'frz 1') newState.freezeToggled = true;
    if (command === 'frz 0') newState.freezeToggled = false;
    this.setState(newState);
  }

  async manualFrequencyEnter() {
    const { manualFrequency } = this.state;
    await post('/api/manual_frequency', { manualFrequency });
    this.setStateAndGlobal({});
  }

  async manualEnter() {
    const { ps1, ps2, pd } = this.state;
    await post('/api/manual_codes', { ps1, ps2, pd });
    this.setState({ codesToggled: true });
    this.setStateAndGlobal({});
  }

  inputChange({ target: { name, value: v } }) {
    let value = v;
    if (isNumeric(value)) value = value.toString().replace(/^[0]+/g, '') || (name === 'command' ? '' : 0);
    this.setState({ [name]: value });
  }

  render() {
    const { response, manualFrequency, ps1, ps2, pd, delay1, delay2, command, codesToggled, timeSyncToggled, freezeToggled } =
      this.state;
    return (
      <Container>
        <CresControl
          inputChange={this.inputChange}
          manualFrequency={manualFrequency}
          manualFrequencyEnter={this.manualFrequencyEnter}
          ps1={ps1}
          ps2={ps2}
          pd={pd}
          manualEnter={this.manualEnter}
          delay1={delay1}
          delay2={delay2}
          timeEnter={this.timeEnter}
          onToggle={this.onToggle}
          codesToggled={codesToggled}
          timeSyncToggled={timeSyncToggled}
          freezeToggled={freezeToggled}
        />
        <Command
          command={command}
          inputChange={this.inputChange}
          enterCommand={this.enterCommand}
          globalStat={this.globalStat}
        />
        <ResponseContainer>
          <Response>{response}</Response>
        </ResponseContainer>
      </Container>
    );
  }
}
