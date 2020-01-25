import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setTrackIndex, togglePlay } from "../redux/actions/playerActions";
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
  const { songs: playlist } = props.state.songs;
  const { trackIndex } = props.state.player;
  const { isPlaying: playing } = props.state.player;

  let audio;

  useEffect(() => {
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
    const newIndex = trackIndex > 0 ? trackIndex - 1 : 0;
    props.setTrackIndex(newIndex);
  };
  const playNext = () => {
    const lastIndex = playlist.length - 1;
    const newIndex = trackIndex < lastIndex ? trackIndex + 1 : lastIndex;
    props.setTrackIndex(newIndex);
  };

  return (
    <PlayerWrapper>
      <audio
        onEnded={playNext}
        ref={ref => (audio = ref)}
        src={playlist[trackIndex] && playlist[trackIndex].preview}
      ></audio>
      <button onClick={playPrev}>prev</button>
      <button onClick={handleClick}>{!playing ? "play" : "pause"}</button>
      <button onClick={playNext}>next</button>
    </PlayerWrapper>
  );
};

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    setTrackIndex: elements => dispatch(setTrackIndex(elements)),
    togglePlay: isPlaying => dispatch(togglePlay(isPlaying))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
