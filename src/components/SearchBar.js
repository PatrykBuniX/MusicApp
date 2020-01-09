import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchSongs } from "../redux/actions/songsActions";
import styled from "styled-components";

const BarWrapper = styled.div`
  width: 100%;
  height: 10vh;
  background: linear-gradient(to right, #20a5c7 0%, #03568a 100%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
`;

const SearchBar = props => {
  const [search, setSearch] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    props.getSongs(search);
    e.target.reset();
    setSearch("");
  };
  const handleChange = e => {
    setSearch(e.target.value);
  };
  return (
    <BarWrapper>
      <p>MusicApp</p>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" />
        <button type="submit">search</button>
      </form>
    </BarWrapper>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    getSongs: query => dispatch(fetchSongs(query))
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
