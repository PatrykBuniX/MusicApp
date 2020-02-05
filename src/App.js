import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import SongsList from "./components/SongsList";
import Player from "./components/Player";
import { GlobalStyle, AppWrapper } from "./StyledComponents";

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
