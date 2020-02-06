import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import SongsList from "./components/SongsList";
import Player from "./components/Player";
import { GlobalStyle, AppWrapper } from "./StyledComponents";
import Div100vh from "react-div-100vh";

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
