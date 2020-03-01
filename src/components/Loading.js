import React from "react";
import styled, { keyframes } from "styled-components";

const PulseKeyframe = keyframes`
    from{
    width: 1.75em;
    height: 1.75em;
  }
  to{
    width: 2em;
    height: 2em;
  }
`;
const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;
const Blob = styled.span`
  position: relative;
  height: 2rem;
  width: 2rem;
  background: #044c7d;
  border-radius: 50%;
  animation: ${PulseKeyframe} 0.25s infinite alternate;
  z-index: 1;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 1.75rem;
    width: 1.75rem;
    transform: translate(-50%, -50%);
    background: #0569ac;
    border: 1px solid #044c7d;
    border-radius: 50%;
    animation: ${PulseKeyframe} 0.5s 0.5s infinite alternate ease-in-out;
  }

  &:nth-child(2) {
    z-index: 2;
  }
`;

const Loading = () => {
  return (
    <Wrapper>
      <Blob></Blob>
      <Blob></Blob>
      <Blob></Blob>
    </Wrapper>
  );
};

export default Loading;
