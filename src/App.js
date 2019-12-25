import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";
//import other components:
import SearchBar from "./components/SearchBar";
import SongsList from "./components/SongsList";

const GlobalStyle = createGlobalStyle`
  *, ::before, ::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <AppWrapper>
      <GlobalStyle />
      <SearchBar />
      <SongsList />
    </AppWrapper>
  );
};

export default App;
