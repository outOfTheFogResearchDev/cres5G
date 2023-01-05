import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-area: manual;
  display: grid;
  grid: 'ps1 ps2 pd menter';
  gap: 10px;
  padding: 10px 10px;
  margin-top: -10px;
  border-style: solid;
  border-color: #eee;
  justify-self: center;
  align-self: center;
`;

export default ({ inputChange, ps1, ps2, pd, manualEnter }) => (
  <Container>
    <label htmlFor="ps1" style={{ gridArea: 'ps1' }}>
      {'PS1: '}
      <input
        style={{ width: '40px' }}
        type="number"
        name="ps1"
        id="ps1"
        value={ps1}
        min="0"
        max="511"
        step="1"
        onChange={inputChange}
      />
    </label>
    <label htmlFor="ps2" style={{ gridArea: 'ps2', marginLeft: '1ch' }}>
      {'PS2: '}
      <input
        style={{ width: '40px' }}
        type="number"
        name="ps2"
        id="ps2"
        value={ps2}
        min="0"
        max="511"
        step="1"
        onChange={inputChange}
      />
    </label>
    <label htmlFor="pd" style={{ gridArea: 'pd', paddingLeft: '1ch' }}>
      {'PD: '}
      <input
        style={{ width: '40px' }}
        type="number"
        name="pd"
        id="pd"
        value={pd}
        min="0"
        max="511"
        step="1"
        onChange={inputChange}
      />
    </label>
    <button
      type="submit"
      style={{ gridArea: 'menter' }}
      onClick={e => {
        e.preventDefault();
        manualEnter();
      }}
    >
      Enter
    </button>
  </Container>
);
