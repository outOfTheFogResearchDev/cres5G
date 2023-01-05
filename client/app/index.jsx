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
      manualFrequency: null,
      ps1: 0,
      ps2: 0,
      pd: 0,
      command: '',
      freqToggled: false,
      codesToggled: false,
      freezeToggled: false,
    };

    [
      'freqRadioChange',
      'manualEnter',
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
      const { [name]: toggle, ps1, ps2, pd, codesToggled } = that.state;
      const newState = { [name]: !toggle };
      switch (name) {
        case 'freqToggled':
          if (!toggle) {
            const {
              data: { frequency },
            } = await post('/api/auto_frequency/off');
            newState.manualFrequency = frequency;
          }
          else {
            await post('/api/auto_frequency');
            newState.manualFrequency = null;
          }
          break;
        case 'codesToggled':
          if (!toggle) {
            newState.freezeToggled = false;
            await post('/api/manual_codes', { ps1, ps2, pd });
          } else await post('/api/firmware');
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

  async enterCommand() {
    let { command } = this.state;
    command = command.trim();
    const {
      data: { response },
    } = await get('/api/command', { params: { command } });
    const newState = { response };
    if (command.slice(0, 4) === 'sf 1') {
      newState.manualFrequency = [1008, 1088, 1168][+command.slice(5)];
    }
    if (command.slice(0, 4) === 'sf 0') {
      newState.manualFrequency = null;
      newState.codesToggled = false;
    }
    if (command.slice(0, 5) === 'mp3 1') {
      const [ps1, ps2, pd] = command.slice(6).split(' ');
      newState.ps1 = ps1;
      newState.ps2 = ps2;
      newState.pd = pd;
      newState.codesToggled = true;
    }
    if (command.slice(0, 5) === 'mp3 0') newState.codesToggled = false;
    if (command === 'frz 1') newState.freezeToggled = true;
    if (command === 'frz 0') newState.freezeToggled = false;
    this.setState(newState);
  }

  async freqRadioChange({ target: { value } }) {
    const manualFrequency = +value;
    await post('/api/manual_frequency', { manualFrequency });
    this.setStateAndGlobal({ manualFrequency, freqToggled: true });
  }

  async manualEnter() {
    const { ps1, ps2, pd } = this.state;
    await post('/api/manual_codes', { ps1, ps2, pd });
    this.setStateAndGlobal({ codesToggled: true });
  }

  inputChange({ target: { name, value: v } }) {
    let value = v;
    if (isNumeric(value)) value = value.toString().replace(/^[0]+/g, '') || (name === 'command' ? '' : 0);
    this.setState({ [name]: value });
  }

  render() {
    const { response, manualFrequency, ps1, ps2, pd, command, freqToggled, codesToggled, freezeToggled } =
      this.state;
    return (
      <Container>
        <CresControl
          freqRadioChange={this.freqRadioChange}
          inputChange={this.inputChange}
          manualFrequency={manualFrequency}
          ps1={ps1}
          ps2={ps2}
          pd={pd}
          manualEnter={this.manualEnter}
          onToggle={this.onToggle}
          freqToggled={freqToggled}
          codesToggled={codesToggled}
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
