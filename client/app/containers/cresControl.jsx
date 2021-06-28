import React from 'react';
import styled from 'styled-components';
import Toggle from './components/toggle';
import ManualInput from './components/manualInput';
import TimeSyncInput from './components/timeSyncInput';

const Grid = styled.div`
  display: grid;
  grid-area: cres;
  grid:
    'title'
    'frequency'
    'codes'
    'timesync'
    'freeze';
  padding: 10px 10px;
  gap: 10px;
  margin-top: 10px;
  border-style: solid;
  border-color: #ddd;
  justify-self: center;
  align-self: center;
`;

const Title = styled.h2`
  grid-area: title;
  justify-self: center;
  align-self: center;
  margin-top: -5px;
  margin-bottom: 0px;
`;

const Frequency = styled.form`
  display: grid;
  grid:
    'header1 freq'
    'header2 freq';
  grid-area: frequency;
  padding: 10px 10px;
  margin-top: -5px;
  border-color: '#000';
  border-style: double;
  justify-self: center;
  align-self: center;
`;

const FrequencyContainer = styled.div`
  grid-area: freq;
  padding: 10px 10px;
  justify-self: center;
  align-self: center;
`;

const CodesContainer = styled.div`
  display: grid;
  grid-area: codes;
  grid:
    'header1 off switch on'
    'header2 off switch on'
    'manual manual manual manual';
  gap: 10px;
  padding: 10px 10px;
  border-color: '#000';
  border-style: double;
  justify-self: center;
  align-self: center;
`;

const TimeSyncContainer = styled.div`
  display: grid;
  grid-area: timesync;
  grid:
    'header off switch on'
    'time time time time';
  gap: 10px;
  padding: 10px 10px;
  border-color: '#000';
  border-style: double;
  justify-self: center;
  align-self: center;
`;

const FreezeContainer = styled.div`
  display: grid;
  grid-area: freeze;
  grid: 'header off switch on';
  gap: 10px;
  padding: 10px 10px;
  border-color: '#000';
  border-style: double;
  justify-self: center;
  align-self: center;
`;

const Label = styled.h3`
  margin-top: 0px;
  grid-area: header;
  justify-self: center;
`;

const SwitchLabelOff = styled.p`
  grid-area: off;
  justify-self: end;
  align-self: center;
`;

const SwitchLabelOn = styled.p`
  grid-area: on;
  align-self: center;
`;

export default ({
  inputChange,
  manualFrequency,
  manualFrequencyEnter,
  ps1,
  ps2,
  pd,
  manualEnter,
  delay1,
  delay2,
  timeEnter,
  onToggle,
  codesToggled,
  timeSyncToggled,
  freezeToggled,
}) => (
  <Grid>
    <Title>Cres Control</Title>
    <Frequency>
      <Label style={{ gridArea: 'header1', marginBottom: '0px' }}>Set Frequency</Label>
      <Label style={{ gridArea: 'header2', marginTop: '0px', marginBottom: '0px' }}>( MHz )</Label>
      <FrequencyContainer>
        <input
          style={{ width: '75px', gridArea: 'freq' }}
          type="number"
          name="manualFrequency"
          id="manualFrequency"
          value={manualFrequency}
          min="0"
          max="200"
          step="0.1"
          onChange={inputChange}
        />
        <button
          type="submit"
          onClick={e => {
            e.preventDefault();
            manualFrequencyEnter();
          }}
        >
          Enter
        </button>
      </FrequencyContainer>
    </Frequency>
    <CodesContainer>
      <Label style={{ gridArea: 'header1', marginBottom: '-10px' }}>Cancellation</Label>
      <Label style={{ gridArea: 'header2', marginTop: '-38px', marginBottom: '0px' }}>Mode</Label>
      <SwitchLabelOff style={{ marginTop: '0px' }}>Auto</SwitchLabelOff>
      <Toggle toggled={codesToggled} onToggle={onToggle('codesToggled')} />
      <SwitchLabelOn style={{ marginTop: '0px' }}>Manual</SwitchLabelOn>
      <ManualInput inputChange={inputChange} ps1={ps1} ps2={ps2} pd={pd} manualEnter={manualEnter} />
    </CodesContainer>
    <TimeSyncContainer>
      <Label>Time Sync</Label>
      <SwitchLabelOff>off</SwitchLabelOff>
      <Toggle toggled={timeSyncToggled} onToggle={onToggle('timeSyncToggled')} />
      <SwitchLabelOn>on</SwitchLabelOn>
      <TimeSyncInput inputChange={inputChange} delay1={delay1} delay2={delay2} timeEnter={timeEnter} />
    </TimeSyncContainer>
    <FreezeContainer>
      <Label>Freeze Codes</Label>
      <SwitchLabelOff>off</SwitchLabelOff>
      <Toggle toggled={freezeToggled} onToggle={onToggle('freezeToggled')} />
      <SwitchLabelOn>on</SwitchLabelOn>
    </FreezeContainer>
  </Grid>
);
