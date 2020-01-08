import React, { useState } from "react";
import { connect } from "react-redux";
// import { setSong } from "../redux/actions/songsActions";
import styled from "styled-components";

const PlayerWrapper = styled.div`
  width: 100%;
  height: 10vh;
  background: linear-gradient(to right, #20a5c7 0%, #03568a 100%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
`;

const Player = props => {
  const initialThree = {
    prev: null,
    current: null,
    next: null
  };
  const { prev, current, next } = props.state.three || initialThree;

  console.log(prev, current, next);

  const playSong = async src => {
    if (!src) return;
    const audio = document.querySelector("audio");
    audio.src = src;
    await audio.play();
  };

  return (
    <PlayerWrapper>
      <audio src=""></audio>
      <button onClick={() => playSong(prev)}>prev</button>
      <button onClick={() => playSong(current)}>play</button>
      <button onClick={() => playSong(next)}>next</button>
    </PlayerWrapper>
  );
};

const mapStateToProps = state => {
  return { state };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     setSong: src => dispatch(setSong(src))
//   };
// };

export default connect(mapStateToProps)(Player);
