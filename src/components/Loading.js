import React from "react";
import styled, { keyframes } from "styled-components";

const PulseKeyframe = keyframes`
   from{
    transform: translateY(0em);
  }
  to{
    transform: translateY(1.75em);
  }
`;
const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
const Blob = styled.span`
  position: relative;
  height: 2.5rem;
  width: 2.5rem;
  background: #044c7d;
  border-radius: 50%;
  animation: ${PulseKeyframe} 0.25s infinite alternate;
  z-index: 1;

  &:nth-child(2) {
    margin: 0 0.25em;
    animation-delay: 0.125s;
  }
  &:nth-child(3) {
    animation-delay: 0.25s;
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
