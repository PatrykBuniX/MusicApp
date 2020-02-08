import axios from "axios";
import rapidapiKey from "./apiKey";

const request = axios.create({
  baseURL: "https://deezerdevs-deezer.p.rapidapi.com/",
  timeout: 10000,
  headers: {
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    "x-rapidapi-key": rapidapiKey
  }
});

export const getSongs = async query => {
  if (!query) return;
  const res = await request.get(`search?q=${query}`);
  const { data: songs } = res.data;
  return songs;
};

export const getMoreSongs = async (query, index) => {
  if (!query) return;
  index += 25;
  const res = await request.get(`search?q=${query}&index=${index}`);
  const { data: songs } = res.data;
  return { songs, index };
};

export const getAlbum = async id => {
  if (!id) return;
  const res = await request.get(`album/${id}`);
  const { tracks, cover } = res.data;
  const songs = [...tracks.data];
  for (let song of songs) {
    song.album = {};
    song.album.cover = cover;
  }
  return songs;
};
