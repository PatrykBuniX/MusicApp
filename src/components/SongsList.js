import React from "react";
import { connect } from "react-redux";
import { fetchSongs } from "../redux/actions/songsActions";
import styled from "styled-components";

const Wrapper = styled.div`
  flex: 1 1 auto;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background: linear-gradient(to right, #bef2fa 0%, #c2d1ff 100%);
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
`;

const ListItem = styled.li`
  margin: 1% 0;
  width: 90%;
  height: 10vh;
  max-height: 80px;
  background: white;
  border: 1px solid gray;
`;

const Button = styled.button`
  display: block;
  width: 50%;
  height: 9vh;
  max-height: 70px;
  margin: 2% auto;
`;

const SongsList = props => {
  const { songs } = props.state;
  return (
    <Wrapper>
      {
        <List>
          {songs &&
            songs.map((song, i) => {
              return <ListItem key={i}>{song.title}</ListItem>;
            })}
        </List>
      }
      {songs.length >= 1 && (
        <Button onClick={() => props.loadMore("donguralesko")}>
          load more...
        </Button>
      )}
    </Wrapper>
  );
};

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMore: query => dispatch(fetchSongs(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongsList);
