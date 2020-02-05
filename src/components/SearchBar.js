import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchSongs, fetchMoreSongs } from "../redux/actions/songsActions";
import { setTrackIndex, togglePlay } from "../redux/actions/playerActions";
import {
  BarWrapper,
  Logo,
  Form,
  Input,
  SubmitButton
} from "../StyledComponents";
import { FaMusic, FaSistrix } from "react-icons/fa";

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
