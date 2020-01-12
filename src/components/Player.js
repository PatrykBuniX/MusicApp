import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setOrder } from "../redux/actions/playerActions";
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
  const [isPlaying, setPlaying] = useState(false);

  const { prev, current, next } = props.state.player;
  let audio;

  useEffect(() => {
    if (!isPlaying) return;
    audio.play();
  });

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
    console.log(isPlaying);
  };

  const playPrev = src => {
    props.setOrder({
      prev: prev.previousElementSibling,
      current: prev,
      next: current
    });
  };
  const playNext = src => {
    props.setOrder({
      prev: current,
      current: next,
      next: next.nextElementSibling
    });
  };

  return (
    <PlayerWrapper>
      <audio
        ref={ref => (audio = ref)}
        src={current && current.dataset.song}
      ></audio>
      <button onClick={() => playPrev(prev.dataset.song)}>prev</button>
      <button onClick={togglePlay}>{!isPlaying ? "play" : "pause"}</button>
      <button onClick={() => playNext(next.dataset.song)}>next</button>
    </PlayerWrapper>
  );
};

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    setOrder: elements => dispatch(setOrder(elements))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
