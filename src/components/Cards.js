import Card from "./Card.js";

const Cards = (props) => {
  return (
    <>
      {props.songs.map((song) => (
        <>
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
        </>
      ))}
    </>
  );
};

export default Cards;
