import React from "react";
import Card from "./Card.js";

const Cards = (props) => {
  return (
    <React.Fragment>
      {props.songs.map((song) => (
        <React.Fragment key={song.id}>
          {song.visible && (
            <Card
              id={song.id}
              name={song.name}
              artist={song.artist}
              chords={song.chords}
              youtube={song.youtube}
              status={song.status}
              lyrics={song.lyrics}
              toggle={props.toggle}
            />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default Cards;
