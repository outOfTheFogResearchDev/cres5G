import React from 'react';
import styled from 'styled-components';
import Toggle from './components/toggle';
import ManualInput from './components/manualInput';
import TimeSyncInput from './components/timeSyncInput';

const Grid = styled.div`
  display: grid;
  grid-area: cres;
  grid:
    'title frequency'
    'codes codes'
    'timesync timesync'
    'freeze freeze';
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
`;

const Frequency = styled.form`
  grid-area: frequency;
  padding: 10px 10px;
  border-color: '#000';
  border-style: double;
  justify-self: center;
  align-self: center;
`;

const CodesContainer = styled.div`
  display: grid;
  grid-area: codes;
  grid:
    'header off switch on'
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
  delay,
  timeEnter,
  onToggle,
  codesToggled,
  timeSyncToggled,
  freezeToggled,
}) => (
  <Grid>
    <Title>Cres Control</Title>
    <Frequency>
      <label htmlFor="manualFrequency">
        {'Set Frequency: '}
        <input
          style={{ width: '75px' }}
          type="number"
          name="manualFrequency"
          id="manualFrequency"
          value={manualFrequency}
          min="0"
          max="200"
          step="0.1"
          onChange={inputChange}
        />
      </label>
      <button
        type="submit"
        onClick={e => {
          e.preventDefault();
          manualFrequencyEnter();
        }}
      >
        Submit
      </button>
    </Frequency>
    <CodesContainer>
      <Label>Codes</Label>
      <SwitchLabelOff>auto</SwitchLabelOff>
      <Toggle toggled={codesToggled} onToggle={onToggle('codesToggled')} />
      <SwitchLabelOn>manual</SwitchLabelOn>
      <ManualInput inputChange={inputChange} ps1={ps1} ps2={ps2} pd={pd} manualEnter={manualEnter} />
    </CodesContainer>
    <TimeSyncContainer>
      <Label>Time Sync</Label>
      <SwitchLabelOff>off</SwitchLabelOff>
      <Toggle toggled={timeSyncToggled} onToggle={onToggle('timeSyncToggled')} />
      <SwitchLabelOn>on</SwitchLabelOn>
      <TimeSyncInput inputChange={inputChange} delay={delay} timeEnter={timeEnter} />
    </TimeSyncContainer>
    <FreezeContainer>
      <Label>Freeze Codes</Label>
      <SwitchLabelOff>off</SwitchLabelOff>
      <Toggle toggled={freezeToggled} onToggle={onToggle('freezeToggled')} />
      <SwitchLabelOn>on</SwitchLabelOn>
    </FreezeContainer>
  </Grid>
);
