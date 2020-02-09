import React from "react";
import { connect } from "react-redux";
import { fetchMoreSongs, fetchAlbum } from "../redux/actions/songsActions";
import { setTrackIndex, togglePlay } from "../redux/actions/playerActions";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 65%;
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
  height: 12%;
  max-height: 80px;
  min-height: 65px;
  background: hsla(0, 0%, 100%, 0.25);
  border-bottom: 4px solid black;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.14, 1.35, 0.54, 1.95),
    background 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;
const LoadMoreButton = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  background: none;
  cursor: pointer;
  border: none;
  outline: none;
`;
const Title = styled.p`
  flex: 1;
  display: block;
  font-size: 1.2em;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Artist = styled.p`
  flex: 1;
  font-size: 0.9em;
  font-style: italic;
`;
const Album = styled.img`
  height: 100%;
  border-left: 2px solid black;
`;

const SongsList = props => {
  const handleClick = e => {
    const { tagName, dataset } = e.target;
    if (tagName === "IMG") return;
    const { index } = dataset;
    props.setTrackIndex(Number(index));
    props.togglePlay(true);
  };

  const handleAlbumClick = e => {
    const { index } = e.target.parentElement.dataset;
    const { songs } = props.state.songs;
    const { id } = songs[index].album;
    if (!id) return;
    props.setTrackIndex(0);
    props.togglePlay(false);
    props.loadAlbum(id);
  };

  const { songs, lastQuery, index } = props.state.songs;

  const checkActive = index => {
    return Number(index) === props.state.player.trackIndex
      ? { background: "hsla(0, 100%, 100%, 0.5)", transform: "scale(1.05)" }
      : null;
  };

  return (
    <Wrapper>
      {
        <List>
          {songs &&
            songs.map((song, i) => {
              const {
                title_short: title,
                artist: { name },
                album: { cover }
              } = song;
              return (
                <ListItem
                  style={checkActive(i)}
                  data-index={i}
                  onClick={e => handleClick(e)}
                  key={i}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      pointerEvents: "none",
                      width: "100%",
                      overflow: "hidden"
                    }}
                  >
                    <Title>
                      {title}
                      {/* {title.length > 23 ? title.slice(0, 23) + "..." : title} */}
                    </Title>
                    <Artist>{name}</Artist>
                  </div>
                  <Album onClick={handleAlbumClick} alt="album" src={cover} />
                </ListItem>
              );
            })}
          {songs.length >= 1 && lastQuery && (
            <ListItem>
              <LoadMoreButton onClick={() => props.loadMore(lastQuery, index)}>
                load more...
              </LoadMoreButton>
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
    loadMore: (lastQuery, index) => dispatch(fetchMoreSongs(lastQuery, index)),
    loadAlbum: id => dispatch(fetchAlbum(id)),
    setTrackIndex: src => dispatch(setTrackIndex(src)),
    togglePlay: isPlaying => dispatch(togglePlay(isPlaying))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
