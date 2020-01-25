import React from "react";

const Wave = props => {
  return (
    <div>
      <div id="waveform" />
      <audio
        onEnded={() =>
          setTimeout(() => {
            console.log("end", props);
          }, 2000)
        }
        ref={props.audRef}
        style={{ display: "none" }}
        id="song"
        src={props.trackChecker()}
      />
    </div>
  );
};

export default Wave;
