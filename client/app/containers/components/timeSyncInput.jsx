import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-area: time;
  display: grid;
  grid:
    'delay1 delay2 tenter'
    'desc desc desc';
  gap: 10px;
  padding: 10px 10px;
  border-style: solid;
  border-color: #eee;
  justify-self: center;
  align-self: center;
`;

const Description = styled.div`
  font-style: italic;
  grid-area: desc;
`;

export default ({ inputChange, delay1, delay2, timeEnter }) => (
  <Container>
    <label htmlFor="delay1" style={{ gridArea: `delay1` }}>
      {`Delay 1 (ms): `}
      <input
        style={{ width: '40px' }}
        type="number"
        name="delay1"
        id="delay1"
        value={delay1}
        min="0"
        max="999"
        step="1"
        onChange={inputChange}
      />
    </label>
    <label htmlFor="delay2" style={{ gridArea: `delay2` }}>
      {`Delay 2 (ms): `}
      <input
        style={{ width: '40px' }}
        type="number"
        name="delay2"
        id="delay2"
        value={delay2}
        min="0"
        max="999"
        step="1"
        onChange={inputChange}
      />
    </label>
    <button
      type="submit"
      style={{ gridArea: 'tenter' }}
      onClick={e => {
        e.preventDefault();
        timeEnter();
      }}
    >
      Enter
    </button>
    <Description>Delay 2 must be either 0 (off) or greater than Delay 1</Description>
  </Container>
);
