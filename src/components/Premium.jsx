import React from 'react';
import styled from 'styled-components';

const Premium = () => {
  return (
    <StyledWrapper>
      <button className="Btn">
        <svg viewBox="0 0 576 512" height="1em" className="logoIcon"><path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" /></svg>
        PREMIUM
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn {
    width: 150px;
    height: 25px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(to right,#bf953f,#fcf6ba,#b38728,#fbf5b7,#aa771c);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 0.8em;
    color: rgb(121, 103, 3);
    font-weight: 600;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition-duration: 3s;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.144);
    background-size: 200% 200%;
  }

  .logoIcon path {
    fill: rgb(121, 103, 3);
  }

  .Btn:hover {
    transform: scale(0.95);
    transition-duration: 3s;
    animation: gradient 5s ease infinite;
    background-position: right;
  }`;

export default Premium;
