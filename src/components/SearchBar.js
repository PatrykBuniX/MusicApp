import React, { useState } from "react";
import styled from "styled-components";

const BarWrapper = styled.div`
  width: 100%;
  height: 10%;
  background: linear-gradient(to right, #20a5c7 0%, #03568a 100%);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SearchBar = props => {
  const [search, setSearch] = useState("");

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

export default SearchBar;
