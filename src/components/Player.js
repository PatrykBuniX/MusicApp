import React, { useState } from "react";
import { connect } from "react-redux";
import { playSong } from "../redux/actions/songsActions";
import styled from "styled-components";

const PlayerWrapper = styled.div`
  width: 100%;
  height: 10vh;
  min-height: 80px;
  background: linear-gradient(to right, #20a5c7 0%, #03568a 100%);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Player = props => {
  const { activeSong } = props.state;

  return (
    <PlayerWrapper>
      <audio src={activeSong}></audio>
      <button onClick={e => props.playSong(e)}>play</button>
    </PlayerWrapper>
  );
};

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    playSong: e => dispatch(playSong(e))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
