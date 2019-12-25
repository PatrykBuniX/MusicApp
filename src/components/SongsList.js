import React from "react";
import { connect } from "react-redux";
import { fetchSongs } from "../redux/actions/songsActions";
import styled from "styled-components";
const SongsWrapper = styled.div`
  flex: 1;
  width: 100%;
  background: linear-gradient(to right, #bef2fa 0%, #c2d1ff 100%);
  overflow-y: scroll;
`;

const SongsList = props => {
  const { songs } = props.state;
  // setInterval(() => console.log(songs), 2000);
  return (
    <SongsWrapper>
      {
        <ul>
          {songs &&
            songs.map((song, i) => {
              return <li key={i}>{song.title}</li>;
            })}
        </ul>
      }
      {songs.length >= 1 && (
        <button onClick={() => props.loadMore("donguralesko")}>
          load more...
        </button>
      )}
    </SongsWrapper>
  );
};

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMore: query => dispatch(fetchSongs(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
