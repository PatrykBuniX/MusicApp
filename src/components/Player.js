import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { setTrackIndex, togglePlay } from "../redux/actions/playerActions";
import styled from "styled-components";

const PlayerWrapper = styled.div`
  width: 100%;
  height: 10vh;
  background: #0569ac;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
`;

const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  font-size: 2em;
  transition: transform 0.2s cubic-bezier(0.14, 1.35, 0.54, 1.95);
  outline: none;

  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(1.1);
  }

  &:nth-of-type(2) {
    margin: 0 10%;

    @media (min-width: 768px) {
      margin: 0 5%;
    }
  }
`;

const Player = props => {
  const { songs: playlist } = props.state.songs;
  const { isPlaying, trackIndex } = props.state.player;

  const audio = useRef(null);
  const canvas = useRef(null);
  const ctx = useRef(null);

  const WIDTH = 1000;
  const HEIGHT = 1000;
  let analyzer;
  let bufferLength;

  const handleClick = () => {
    if (!audio.current.src) return;
    if (isPlaying) {
      console.dir(audio.current);
      props.togglePlay(false);
    } else {
      props.togglePlay(true);
    }
  };

  //check the isPlaying flag and play/pause audio
  useEffect(() => {
    if (!isPlaying) {
      audio.current.pause();
    } else {
      audio.current.play();
    }
  });

  useEffect(() => {
    ctx.current = canvas.current.getContext("2d");
    canvas.current.width = WIDTH;
    canvas.current.height = HEIGHT;
  }, [WIDTH, HEIGHT]);

  const getAudio = async () => {
    if (!audio.current.captureStream) return;
    const stream = audio.current.captureStream();
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(stream);

    analyzer = audioCtx.createAnalyser();
    source.connect(analyzer);

    analyzer.fftSize = 2 ** 8;

    bufferLength = analyzer.frequencyBinCount;
    const frequencyData = new Uint8Array(bufferLength);
    drawFrequency(frequencyData);
  };

  const drawFrequency = frequencyData => {
    ctx.current.clearRect(0, 0, WIDTH, HEIGHT);

    analyzer.getByteFrequencyData(frequencyData);

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let x = 0;

    frequencyData.forEach(amount => {
      const percent = amount / 255;
      const barHeight = HEIGHT * percent;

      ctx.current.fillStyle = `hsla(204, 96%, 49%, ${percent})`;
      ctx.current.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      x += barWidth;
    });

    requestAnimationFrame(() => drawFrequency(frequencyData));
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
        onCanPlayThrough={getAudio}
        crossOrigin="anonymous"
        onEnded={playNext}
        ref={audio}
        src={playlist[trackIndex] && playlist[trackIndex].preview}
      ></audio>
      <Canvas ref={canvas}></Canvas>
      <Button onClick={playPrev}>
        <span role="img" aria-label="previous">
          ⏮
        </span>
      </Button>
      <Button onClick={handleClick}>
        {!isPlaying ? (
          <span role="img" aria-label="music note">
            🎵
          </span>
        ) : (
          <span role="img" aria-label="pause">
            ⏸
          </span>
        )}
      </Button>
      <Button onClick={playNext}>
        <span role="img" aria-label="next">
          ⏭
        </span>
      </Button>
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
