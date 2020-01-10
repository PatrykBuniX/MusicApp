import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setSongs } from "../redux/actions/songsActions";
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
  const initElements = {
    prev: null,
    current: null,
    next: null
  };

  const [playing, setPlaying] = useState(false);

  // const [order, setOrder] = useState({
  //   prev: null,
  //   current: null,
  //   next: null
  // })

  const { prev, current, next } = props.state.elements || initElements;

  console.log(prev, current, next);

  // const audio = document.querySelector("audio");
  let audio;

  // useEffect(() => {
  //   loadSong(order.current)
  // })

  const loadSong = src => {
    if (!src) return;
    audio.src = src;
    // audio.addEventListener("ended", () => {
    //   setPlaying(false);
    //   return audio.removeEventListener("ended", () => {
    //     setPlaying(false);
    //   });
    // });
  };

  const togglePlay = () => {
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.start();
      setPlaying(true);
    }
  };

  const playPrev = src => {
    props.setSongs({
      prev: prev.previousElementSibling,
      current: prev,
      next: current
    });
    loadSong(src);
  };
  const playNext = src => {
    props.setSongs({
      prev: current,
      current: next,
      next: next.nextElementSibling
    });
    loadSong(src);
  };

  return (
    <PlayerWrapper>
      <audio ref={ref => (audio = ref)} src=""></audio>
      <button onClick={() => playPrev(prev.dataset.song)}>prev</button>
      <button onClick={() => togglePlay(current.dataset.song)}>
        {!playing ? "play" : "pause"}
      </button>
      <button onClick={() => playNext(next.dataset.song)}>next</button>
    </PlayerWrapper>
  );
};

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    setSongs: elements => dispatch(setSongs(elements))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
