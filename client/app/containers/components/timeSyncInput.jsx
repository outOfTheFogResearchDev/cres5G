import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-area: time;
  display: grid;
  grid: 'delay tenter';
  gap: 10px;
  padding: 10px 10px;
  border-style: solid;
  border-color: #eee;
  justify-self: center;
  align-self: center;
`;

export default ({ inputChange, delay, timeEnter }) => (
  <Container>
    <label htmlFor="delay" style={{ gridArea: 'delay' }}>
      {'Delay: '}
      <input
        style={{ width: '40px' }}
        type="number"
        name="delay"
        id="delay"
        value={delay}
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
  </Container>
);
