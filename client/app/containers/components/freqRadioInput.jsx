import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-area: manual;
  display: grid;
  grid: 'header r0 r1 r2';
  gap: 10px;
  padding: 10px 10px;
  margin-top: 10px;
  border-style: solid;
  border-color: #eee;
  justify-self: center;
  align-self: center;
`;

const Label = styled.label`
  margin-top: 0px;
  grid-area: header;
  justify-self: center;
`;

export default ({ radioChange, manualFrequency }) => (
  <Container>
    <Label>( MHz )</Label>
    <label htmlFor="r0" style={{ gridArea: 'r0' }}>
      {'1008'}
      <input
          type="radio"
          name="r0"
          id="r0"
          value="1008"
          checked={manualFrequency === 1008}
          onChange={radioChange}
      />
    </label>
    <label htmlFor="r1" style={{ gridArea: 'r1' }}>
      {'1088'}
      <input
          type="radio"
          name="r1"
          id="r1"
          value="1088"
          checked={manualFrequency === 1088}
          onChange={radioChange}
      />
    </label>
    <label htmlFor="r2" style={{ gridArea: 'r2' }}>
      {'1168'}
      <input
          type="radio"
          name="r2"
          id="r2"
          value="1168"
          checked={manualFrequency === 1168}
          onChange={radioChange}
      />
    </label>
  </Container>
);
  