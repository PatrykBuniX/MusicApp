import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchSongs, fetchMoreSongs } from "../redux/actions/songsActions";
import { setTrackIndex, togglePlay } from "../redux/actions/playerActions";
import styled from "styled-components";
import { FaMusic, FaSistrix } from "react-icons/fa";

const BarWrapper = styled.div`
  width: 100%;
  height: 10%;
  background: #18829c;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.p`
  flex: 1;
  max-width: 250px;
  display: flex;
  justify-content: flex-start;
  font-size: 1em;
  font-weight: bold;
  margin-left: 5%;
`;
const Form = styled.form`
  flex: 1;
  max-width: 250px;
  display: flex;
  justify-content: flex-end;
  margin-right: 5%;
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
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(1.1);
  }
`;
const SubmitButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.25em;
  margin-left: 5%;
  transition: transform 0.2s cubic-bezier(0.14, 1.35, 0.54, 1.95);
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
        <FaMusic style={{ fontSize: "1.25em", marginRight: "5%" }} />
        MusicApp
      </Logo>
      <Form onSubmit={handleSubmit}>
        <Input onChange={handleChange} type="text" />
        <SubmitButton type="submit">
          <FaSistrix />
        </SubmitButton>
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
