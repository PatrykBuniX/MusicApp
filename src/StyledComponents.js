import styled, { createGlobalStyle } from "styled-components";

//App:
export const GlobalStyle = createGlobalStyle`
  *, ::before, ::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }
`;
export const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 100vh));
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

//SearchBar:
export const BarWrapper = styled.div`
  width: 100%;
  height: 10%;
  background: #18829c;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`;
export const Logo = styled.p`
  flex: 1;
  max-width: 250px;
  display: flex;
  justify-content: flex-start;
  font-size: 1em;
  font-weight: bold;
  margin-left: 5%;
`;
export const Form = styled.form`
  flex: 1;
  max-width: 250px;
  display: flex;
  justify-content: flex-end;
  margin-right: 5%;
`;
export const Input = styled.input`
  width: 80%;
  background: none;
  border: none;
  border-bottom: 2px solid #0569ac;
  outline: none;
  transform-origin: right;
  transition: transform 0.2s cubic-bezier(0.14, 1.35, 0.54, 1.95);
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(1.1);
  }
`;
export const SubmitButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.25em;
  margin-left: 5%;
  transition: transform 0.2s cubic-bezier(0.14, 1.35, 0.54, 1.95);
  outline: none;
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(1.1);
  }
`;

//SongsList:
export const Wrapper = styled.div`
  height: 65%;
  width: 100vw;
  flex: 1 1 auto;
  position: relative;
  background: linear-gradient(to bottom, #18829c 0%, #0569ac 100%);
`;
export const List = styled.ul`
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  list-style-type: none;
  height: 100%;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const ListItem = styled.li`
  margin: 1% auto;
  width: 90%;
  max-width: 500px;
  height: 12%;
  max-height: 80px;
  min-height: 65px;
  background: hsla(0, 0%, 100%, 0.25);
  border-bottom: 4px solid black;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.14, 1.35, 0.54, 1.95),
    background 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;
export const LoadMoreButton = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  background: none;
  cursor: pointer;
  border: none;
`;
export const Title = styled.p`
  font-size: 1.1em;
`;
export const Artist = styled.p`
  font-size: 0.9em;
`;
export const Album = styled.img`
  height: 100%;
  border-left: 2px solid black;
`;
export const Link = styled.a`
  pointer-events: auto;
  color: blue;
  text-decoration: none;
`;

//Player:
export const PlayerWrapper = styled.div`
  width: 100%;
  height: 25%;
  background: #0569ac;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  padding: 1% 0;
`;
export const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
export const ProgressBar = styled.div`
  height: 7%;
  min-height: 10px;
  border-radius: 50px;
  background: hsla(244, 0%, 100%, 0.9);
  width: 80%;
  max-width: 700px;
  display: flex;
  cursor: pointer;
  z-index: 1;
`;
export const Progress = styled.div`
  border-radius: 50px;
  background: #022740;
  flex-basis: 0%;
`;
export const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1.25em;
  z-index: 1;
`;
export const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.5em;
  outline: none;
  transition: transform 0.2s cubic-bezier(0.14, 1.35, 0.54, 1.95);

  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(1.1);
  }

  &:nth-child(2) {
    margin: 0 10%;

    @media (min-width: 768px) {
      margin: 0 5%;
    }
  }
`;
export const CurrentTrack = styled.p`
  color: white;
  font-size: 1em;
`;
export const VolumeBar = styled.div`
  height: 5%;
  min-height: 5px;
  border-radius: 50px;
  background: hsla(244, 0%, 100%, 0.9);
  width: 60%;
  max-width: 400px;
  display: flex;
  cursor: pointer;
  z-index: 1;
`;
export const Volume = styled.div`
  border-radius: 50px;
  background: #022740;
  flex-basis: 50%;
`;
