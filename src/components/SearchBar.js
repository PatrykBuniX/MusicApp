import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchSongs, fetchMoreSongs } from "../redux/actions/songsActions";
import { setTrackIndex, togglePlay } from "../redux/actions/playerActions";
import styled from "styled-components";

const BarWrapper = styled.div`
  width: 100%;
  height: 10vh;
  background: #18829c;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  font-size: 1rem;

  /* @media (min-width: 768px) {
    justify-content: flex-start;
  } */
`;

const Logo = styled.p`
  flex: 1;
  max-width: 250px;
  display: flex;
  justify-content: center;
  font-size: 1em;
  font-weight: bold;
`;

const Form = styled.form`
  flex: 1;
  max-width: 250px;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  width: 80%;
  background: none;
  border: none;
  border-bottom: 2px solid #0569ac;
  outline: none;
  transform-origin: right;
  transition: transform 0.2s cubic-bezier(0.14, 1.35, 0.54, 1.95);

  &:hover {
    transform: scale(1.2);
  }
  &:focus {
    transform: scale(1.2);
  }
`;
const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1em;
  margin-left: 5%;
  transition: transform 0.2s ease-in-out;
  outline: none;

  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(1.1);
  }
`;

const SearchBar = props => {
  const [search, setSearch] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (search === props.lastQuery) {
      props.getMoreSongs(search);
    } else {
      props.setTrackIndex(0);
      props.togglePlay(false);
      props.getSongs(search);
    }
    e.target.reset();
    setSearch("");
  };
  const handleChange = e => {
    setSearch(e.target.value);
  };
  return (
    <BarWrapper>
      <Logo>
        <span role="img" aria-label="music note">
          🎵
        </span>{" "}
        MusicApp
      </Logo>
      <Form onSubmit={handleSubmit}>
        <Input onChange={handleChange} type="text" />
        <Button type="submit">
          <span role="img" aria-label="magnify">
            🔍
          </span>
        </Button>
      </Form>
    </BarWrapper>
  );
};
const mapStateToProps = state => {
  return { lastQuery: state.songs.lastQuery };
};

const mapDispatchToProps = dispatch => {
  return {
    getSongs: query => dispatch(fetchSongs(query)),
    getMoreSongs: query => dispatch(fetchMoreSongs(query)),
    setTrackIndex: index => dispatch(setTrackIndex(index)),
    togglePlay: index => dispatch(togglePlay(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
