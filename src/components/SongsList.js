import React from "react";
import { connect } from "react-redux";
import { fetchMoreSongs } from "../redux/actions/songsActions";
import { setTrackIndex, togglePlay } from "../redux/actions/playerActions";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 10vh 0;
  height: 70vh;
  width: 100vw;
  flex: 1 1 auto;
  position: relative;
  background: linear-gradient(to bottom, #18829c 0%, #0569ac 100%);
`;

const List = styled.ul`
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  list-style-type: none;
  height: 100%;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListItem = styled.li`
  margin: 1% auto;
  width: 90%;
  max-width: 500px;
  height: 15%;
  max-height: 70px;
  background: hsla(244, 0%, 100%, 0.25);
  border-bottom: 4px solid black;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  background: none;
  cursor: pointer;
  border: none;
`;

const Title = styled.p`
  font-size: 1.1em;
`;
const Artist = styled.p`
  font-size: 0.9em;
`;

const Album = styled.img`
  height: 100%;
  border-left: 2px solid black;
`;

const Link = styled.a`
  color: blue;
  text-decoration: none;
`;

const SongsList = props => {
  const handleClick = e => {
    console.dir(e.target);
    if (e.target.tagName === "A") return;
    const { index } = e.target.dataset;
    props.setTrackIndex(Number(index));
    props.togglePlay(true);
  };

  const { songs, lastQuery } = props.state.songs;

  return (
    <Wrapper>
      {
        <List>
          {songs &&
            songs.map((song, i) => {
              return (
                <ListItem data-index={i} onClick={e => handleClick(e)} key={i}>
                  <div>
                    <Title>{song.title_short}</Title>
                    <Artist>{song.artist.name}</Artist>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      href={song.preview}
                    >
                      link
                    </Link>
                  </div>
                  <Album alt="album" src={song.album.cover} />
                </ListItem>
              );
            })}
          {songs.length >= 1 && (
            <ListItem>
              <Button onClick={() => props.loadMore(lastQuery)}>
                load more...
              </Button>
            </ListItem>
          )}
        </List>
      }
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMore: query => dispatch(fetchMoreSongs(query)),
    setTrackIndex: src => dispatch(setTrackIndex(src)),
    togglePlay: isPlaying => dispatch(togglePlay(isPlaying))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
