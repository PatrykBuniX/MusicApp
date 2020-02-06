import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { setTrackIndex, togglePlay } from "../redux/actions/playerActions";
import {
  PlayerWrapper,
  Canvas,
  ProgressBar,
  Progress,
  Buttons,
  Button,
  CurrentTrack,
  VolumeBar,
  Volume
} from "../StyledComponents";

import {
  FaPlay,
  FaPause,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaVolumeOff,
  FaVolumeUp
} from "react-icons/fa";

const Player = props => {
  const { songs: playlist } = props.state.songs;
  const { isPlaying, trackIndex } = props.state.player;

  const audio = useRef(null);
  const canvas = useRef(null);
  const ctx = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeRef = useRef(null);
  const volumeBarRef = useRef(null);
  const timeRef = useRef(null);
  const durationRef = useRef(null);

  const WIDTH = 1000;
  const HEIGHT = 1000;
  let analyzer;
  let bufferLength;

  useEffect(() => {
    audio.current.volume = 0.5;
  }, []);

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

  const getAudioData = async () => {
    if (!audio.current.captureStream) return;
    const stream = audio.current.captureStream();
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(stream);

    analyzer = audioCtx.createAnalyser();
    source.connect(analyzer);

    analyzer.fftSize = 2 ** 7;

    bufferLength = analyzer.frequencyBinCount;
    const frequencyData = new Uint8Array(bufferLength);
    durationRef.current.innerText = setTimeStamp(audio.current.duration);
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

  const handlePlayPause = () => {
    if (!audio.current.src) return;
    if (isPlaying) {
      props.togglePlay(false);
    } else {
      props.togglePlay(true);
    }
  };

  const playPrev = () => {
    const newIndex = trackIndex > 0 ? trackIndex - 1 : 0;
    props.setTrackIndex(newIndex);
  };
  const playNext = () => {
    const lastIndex = playlist.length - 1;
    const newIndex = trackIndex < lastIndex ? trackIndex + 1 : 0; //if playing last song, play first one on next
    props.setTrackIndex(newIndex);
  };

  const handleProgress = () => {
    const { currentTime, duration } = audio.current;
    const percent = (currentTime / duration) * 100;
    progressRef.current.style.flexBasis = `${percent}%`;
    setTimeStamp(currentTime);
    durationRef.current.innerText = setTimeStamp(duration);
    timeRef.current.innerText = setTimeStamp(currentTime);
  };

  const handleProgressChange = e => {
    e.persist();
    if (!audio.current.currentTime) return;
    const { width, left } = progressBarRef.current.getBoundingClientRect();
    const percent = (e.pageX - left) / width;
    audio.current.currentTime = percent * audio.current.duration;
  };

  const handleVolumeChange = e => {
    e.persist();
    const { width, left } = volumeBarRef.current.getBoundingClientRect();
    const percent = (e.pageX - left) / width;
    audio.current.volume = percent;
    volumeRef.current.style.flexBasis = `${percent * 100}%`;
  };

  const setTimeStamp = secs => {
    if (!secs) {
      secs = 0;
    }
    const mins = Math.floor(secs / 60);
    secs = Math.floor(secs % 60);
    return `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  return (
    <PlayerWrapper>
      <audio
        onTimeUpdate={handleProgress}
        onCanPlayThrough={getAudioData}
        crossOrigin="anonymous"
        onEnded={playNext}
        ref={audio}
        src={playlist[trackIndex] && playlist[trackIndex].preview}
      ></audio>
      <Canvas ref={canvas}></Canvas>
      <CurrentTrack>
        {playlist[trackIndex]
          ? `${playlist[trackIndex].artist.name} - ${playlist[trackIndex].title}`
          : "..."}
      </CurrentTrack>
      <ProgressBar id="bar" ref={progressBarRef} onClick={handleProgressChange}>
        <span
          style={{ position: "absolute", left: 0, top: "100%" }}
          ref={timeRef}
        >
          00:00
        </span>
        <Progress id="progress" ref={progressRef}></Progress>
        <span
          style={{ position: "absolute", right: 0, top: "100%" }}
          ref={durationRef}
        >
          00:00
        </span>
      </ProgressBar>
      <Buttons>
        <Button onClick={playPrev}>
          <FaAngleDoubleLeft />
        </Button>
        <Button onClick={handlePlayPause}>
          {!isPlaying ? <FaPlay /> : <FaPause />}
        </Button>
        <Button onClick={playNext}>
          <FaAngleDoubleRight />
        </Button>
      </Buttons>
      <VolumeBar ref={volumeBarRef} onClick={handleVolumeChange}>
        <FaVolumeOff
          style={{ position: "absolute", left: "-10%", top: "-50%" }}
        />
        <Volume ref={volumeRef}></Volume>
        <FaVolumeUp
          style={{
            position: "absolute",
            right: "-10%",
            top: "-50%"
          }}
        />
      </VolumeBar>
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
