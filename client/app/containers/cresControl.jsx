import React from 'react';
import styled from 'styled-components';
import Toggle from './components/toggle';
import FreqRadioInput from './components/freqRadioInput';
import ManualInput from './components/manualInput';

const Grid = styled.div`
  display: grid;
  grid-area: cres;
  grid:
    'title'
    'frequency'
    'codes'
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

const FrequencyContainer = styled.form`
  display: grid;
  grid:
    'header off switch on'
    'manual manual manual manual';
  grid-area: frequency;
  padding: 10px 10px;
  margin-top: -5px;
  border-color: '#000';
  border-style: double;
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
  freqRadioChange,
  inputChange,
  manualFrequency,
  ps1,
  ps2,
  pd,
  manualEnter,
  onToggle,
  freqToggled,
  codesToggled,
  freezeToggled,
}) => (
  <Grid>
    <Title>Cres Control</Title>
    <FrequencyContainer>
      <Label>Set Frequency</Label>
      <SwitchLabelOff style={{ marginTop: '0px', marginLeft: '10px', marginRight: '10px' }}>Auto</SwitchLabelOff>
      <Toggle toggled={freqToggled} onToggle={onToggle('freqToggled')} />
      <SwitchLabelOn style={{ marginTop: '0px', marginLeft: '10px' }}>Manual</SwitchLabelOn>
      <FreqRadioInput radioChange={freqRadioChange} manualFrequency={manualFrequency} />
    </FrequencyContainer>
    <CodesContainer>
      <Label style={{ gridArea: 'header1', marginBottom: '-10px' }}>Cancellation</Label>
      <Label style={{ gridArea: 'header2', marginTop: '-38px', marginBottom: '0px' }}>Mode</Label>
      <SwitchLabelOff style={{ marginTop: '0px' }}>Auto</SwitchLabelOff>
      <Toggle toggled={codesToggled} onToggle={onToggle('codesToggled')} />
      <SwitchLabelOn style={{ marginTop: '0px' }}>Manual</SwitchLabelOn>
      <ManualInput inputChange={inputChange} ps1={ps1} ps2={ps2} pd={pd} manualEnter={manualEnter} />
    </CodesContainer>
    <FreezeContainer>
      <Label>Freeze Codes</Label>
      <SwitchLabelOff>off</SwitchLabelOff>
      <Toggle toggled={freezeToggled} onToggle={onToggle('freezeToggled')} />
      <SwitchLabelOn>on</SwitchLabelOn>
    </FreezeContainer>
  </Grid>
);
