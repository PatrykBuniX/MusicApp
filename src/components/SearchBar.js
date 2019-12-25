import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchSongs } from "../redux/actions/songsActions";
import styled from "styled-components";

const BarWrapper = styled.div`
  /* flex: 1 1 auto; */
  width: 100%;
  height: 10vh;
  min-height: 70px;
  background: linear-gradient(to right, #20a5c7 0%, #03568a 100%);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SearchBar = props => {
  const [search, setSearch] = useState("");

  useEffect(() => props.getSongs("donguralesko"), []);

  const handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    props.getSongs(search);
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
