import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import SearchBar from "./components/SearchBar";
import SongsList from "./components/SongsList";
import Player from "./components/Player";
import Div100vh from "react-div-100vh";

const GlobalStyle = createGlobalStyle`
  *, ::before, ::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }
`;
const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const App = () => {
  return (
    <Div100vh>
      <AppWrapper>
        <GlobalStyle />
        <SearchBar />
        <SongsList />
        <Player />
      </AppWrapper>
    </Div100vh>
  );
};

export default App;
