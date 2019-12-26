import React, { useState } from "react";
import { connect } from "react-redux";
// import { playSong } from "../redux/actions/songsActions";
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
  const { activeSong } = props.state;

  return (
    <PlayerWrapper>
      <audio src=""></audio>
      <button onClick={e => props.playSong(e)}>play</button>
    </PlayerWrapper>
  );
};

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(Player);
