import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setOrder, togglePlay } from "../redux/actions/playerActions";
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
  const { prev, current, next } = props.state.player.elements;
  const { isPlaying: playing } = props.state.player;

  let audio;

  useEffect(() => {
    audio.addEventListener("ended", () => console.log("end"));
  }, []);

  useEffect(() => {
    console.log("use effect!");
    if (!playing) return;
    audio.play();
  });

  const handleClick = () => {
    if (playing) {
      audio.pause();
      props.togglePlay(false);
    } else {
      audio.play();
      props.togglePlay(true);
    }
    console.log(playing);
  };

  const playPrev = () => {
    props.setOrder({
      prev: prev.previousElementSibling,
      current: prev,
      next: current
    });
  };
  const playNext = () => {
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
      <button onClick={handleClick}>{!playing ? "play" : "pause"}</button>
      <button onClick={() => playNext(next.dataset.song)}>next</button>
    </PlayerWrapper>
  );
};

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    setOrder: elements => dispatch(setOrder(elements)),
    togglePlay: elements => dispatch(togglePlay(elements))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
