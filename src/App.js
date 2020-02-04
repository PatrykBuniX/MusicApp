import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import SearchBar from "./components/SearchBar";
import SongsList from "./components/SongsList";
import Player from "./components/Player";

const GlobalStyle = createGlobalStyle`
  *, ::before, ::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }
`;

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 100vh));
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const App = () => {
  const [vh, setVh] = useState();

  useEffect(() => {
    setVh(window.innerHeight);
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [vh]);

  useEffect(() => {
    window.addEventListener("resize", () => setVh(window.innerHeight));
    return () => {
      window.removeEventListener("resize", () => setVh(window.innerHeight));
    };
  }, []);

  return (
    <AppWrapper>
      <GlobalStyle />
      <SearchBar />
      <SongsList />
      <Player />
    </AppWrapper>
  );
};

export default App;
