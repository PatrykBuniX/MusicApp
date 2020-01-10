import React from "react";
import { connect } from "react-redux";
import { fetchSongs, setSongs } from "../redux/actions/songsActions";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 10vh 0;
  height: 70vh;
  width: 100vw;
  flex: 1 1 auto;
  background: linear-gradient(to right, #bef2fa 0%, #c2d1ff 100%);
`;

const List = styled.ul`
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  list-style-type: none;
  height: 100%;
  width: 100%;
`;

const ListItem = styled.li`
  margin: 1% auto;
  width: 90%;
  max-width: 600px;
  height: 15%;
  max-height: 80px;
  background: white;
  border: 2px solid black;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  display: block;
  margin: 1vh auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
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
  const playSong = src => {
    if (!src) return;
    const audio = document.querySelector("audio");
    audio.src = src;
    audio.play();
  };

  const handleClick = e => {
    const current = e.target;
    const prev = e.target.previousElementSibling;
    const next = e.target.nextElementSibling;
    const currentSrc = current.dataset.song;
    playSong(currentSrc);
    props.setSongs({ prev, current, next });
  };

  const { songs, lastQuery } = props.state.songs;
  return (
    <Wrapper>
      {
        <List>
          {songs &&
            songs.map((song, i) => {
              return (
                <ListItem
                  data-song={song.preview}
                  onClick={e => handleClick(e)}
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
    setSongs: src => dispatch(setSongs(src))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
