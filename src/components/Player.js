import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { setTrackIndex, togglePlay } from "../redux/actions/playerActions";
import styled from "styled-components";

const PlayerWrapper = styled.div`
  width: 100%;
  height: 10vh;
  background: #0569ac;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
`;

const Player = props => {
  const { songs: playlist } = props.state.songs;
  const { trackIndex } = props.state.player;
  const { isPlaying: playing } = props.state.player;

  let audio;
  let canvas;

  let ctx;

  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  let analyzer;
  let bufferLength;
  useEffect(() => {
    if (!playing) return;
    audio.load();
    audio.addEventListener("canplaythrough", () => {
      getAudio();
    });
  });

  useEffect(() => {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext("2d");
  });

  async function getAudio() {
    if (!audio) return;
    audio.play();
    if (!audio.captureStream) return;
    const stream = audio.captureStream();

    const audioCtx = new AudioContext();
    analyzer = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyzer);

    analyzer.fftSize = 2 ** 8;

    bufferLength = analyzer.frequencyBinCount;
    const frequencyData = new Uint8Array(bufferLength);
    drawFrequency(frequencyData);
  }

  function drawFrequency(frequencyData) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    analyzer.getByteFrequencyData(frequencyData);

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let x = 0;

    frequencyData.forEach(amount => {
      const percent = amount / 255;
      const barHeight = HEIGHT * percent;

      ctx.fillStyle = `hsla(204, 96%, 49%, ${percent})`;
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      x += barWidth;
    });

    requestAnimationFrame(() => drawFrequency(frequencyData));
  }

  const handleClick = () => {
    if (playing) {
      audio.pause();
      props.togglePlay(false);
    } else {
      audio.play();
      props.togglePlay(true);
    }
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
        crossOrigin="anonymous"
        onEnded={playNext}
        ref={ref => (audio = ref)}
        src={playlist[trackIndex] && playlist[trackIndex].preview}
      ></audio>
      <Canvas ref={ref => (canvas = ref)}></Canvas>
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
