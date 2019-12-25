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
  const [state, setState] = useState({ index: 0 });

  const rapidapiKey = "e3650c6f8dmsh887cb309606fb83p1d642bjsnd3e1655cd54d";

  const base = "https://deezerdevs-deezer.p.rapidapi.com";

  const getSongs = async artist => {
    try {
      const res = await axios.get(
        `${base}/search?q=${artist}&index=${state.index}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": rapidapiKey
          }
        }
      );
      const newIndex = state.index + 25;
      const { data: songs } = res.data;
      const newSongs = () => (state.songs ? [...state.songs, ...songs] : songs);
      setState({ songs: newSongs(), index: newIndex });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppWrapper>
      <GlobalStyle />
      <SearchBar getSongs={getSongs} />
      <SongsList data={state} loadMore={getSongs} />
    </AppWrapper>
  );
};

export default App;
