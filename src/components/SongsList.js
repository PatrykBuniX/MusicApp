import React from "react";
import styled from "styled-components";

const SongsWrapper = styled.div`
  flex: 1;
  width: 100%;
  background: linear-gradient(to right, #bef2fa 0%, #c2d1ff 100%);
  overflow-y: scroll;
`;

const SongsList = props => {
  const { songs } = props.data;
  console.log(typeof songs);
  return (
    <SongsWrapper>
      {
        <ul>
          {songs &&
            songs.map(song => {
              return (
                <li key={Math.floor(Math.random() * 10000)}>{song.title}</li>
              );
            })}
        </ul>
      }
      {songs && (
        <button onClick={() => props.loadMore("donguralesko")}>
          load more...
        </button>
      )}
    </SongsWrapper>
  );
};

export default SongsList;
