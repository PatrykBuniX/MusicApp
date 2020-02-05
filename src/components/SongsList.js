import React from "react";
import { connect } from "react-redux";
import { fetchMoreSongs, fetchAlbum } from "../redux/actions/songsActions";
import { setTrackIndex, togglePlay } from "../redux/actions/playerActions";
import {
  Wrapper,
  List,
  ListItem,
  LoadMoreButton,
  Title,
  Artist,
  Album,
  Link
} from "../StyledComponents";

const SongsList = props => {
  const handleClick = e => {
    const { tagName, dataset } = e.target;
    if (tagName === "A" || tagName === "IMG") return;
    const { index } = dataset;
    props.setTrackIndex(Number(index));
    props.togglePlay(true);
  };

  const handleAlbumClick = e => {
    const { index } = e.target.parentElement.dataset;
    const { songs } = props.state.songs;
    const { id } = songs[index].album;
    props.setTrackIndex(0);
    props.togglePlay(false);
    props.loadAlbum(id);
  };

  const { songs, lastQuery } = props.state.songs;

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
              return (
                <ListItem
                  style={checkActive(i)}
                  data-index={i}
                  onClick={e => handleClick(e)}
                  key={i}
                >
                  <div style={{ pointerEvents: "none" }}>
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
                  <Album
                    onClick={handleAlbumClick}
                    alt="album"
                    src={song.album.cover}
                  />
                </ListItem>
              );
            })}
          {songs.length >= 1 && lastQuery && (
            <ListItem>
              <LoadMoreButton onClick={() => props.loadMore(lastQuery)}>
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
    loadMore: query => dispatch(fetchMoreSongs(query)),
    loadAlbum: id => dispatch(fetchAlbum(id)),
    setTrackIndex: src => dispatch(setTrackIndex(src)),
    togglePlay: isPlaying => dispatch(togglePlay(isPlaying))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
