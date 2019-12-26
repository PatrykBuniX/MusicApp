import React from "react";
import { connect } from "react-redux";
import {
  fetchSongs,
  handleClick,
  setSong
} from "../redux/actions/songsActions";
import styled from "styled-components";

const Wrapper = styled.div`
  flex: 1 1 auto;
  margin: 10vh 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: linear-gradient(to right, #bef2fa 0%, #c2d1ff 100%);
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
`;

const ListItem = styled.li`
  margin: 1% 0;
  width: 90%;
  height: 10vh;
  max-height: 80px;
  background: white;
  border: 2px solid black;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  display: block;
  width: 50%;
  height: 9vh;
  max-height: 70px;
  margin: 2% auto;
`;

const Title = styled.p`
  font-size: 0.9em;
`;
const Artist = styled.p`
  font-size: 0.8em;
  color: grey;
`;

const Album = styled.img`
  height: 100%;
  border-left: 2px solid black;
`;

const SongsList = props => {
  const playSong = e => {
    const src = e.target.dataset.song;
    if (!src) return;
    const audio = document.querySelector("audio");
    audio.src = src;
    audio.play();
    // props.setSong(src);
  };

  const { songs, lastQuery } = props.state;
  console.log(songs);
  return (
    <Wrapper>
      {
        <List>
          {songs &&
            songs.map((song, i) => {
              return (
                <ListItem
                  data-song={song.preview}
                  onClick={e => playSong(e)}
                  key={i}
                >
                  <div>
                    <Title>{song.title_short}</Title>
                    <Artist>{song.artist.name}</Artist>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={song.preview}
                    >
                      link
                    </a>
                  </div>
                  <Album alt="album" src={song.album.cover} />
                </ListItem>
              );
            })}
        </List>
      }
      {songs.length >= 1 && (
        <Button onClick={() => props.loadMore(lastQuery)}>load more...</Button>
      )}
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMore: query => dispatch(fetchSongs(query)),
    setSong: src => dispatch(setSong(src))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
