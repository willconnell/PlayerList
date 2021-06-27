import Card from "./Card.js";

const Cards = (props) => {
  return (
    <>
      {props.songs.map((song) => (
        <Card
          key={song.id}
          name={song.name}
          artist={song.artist}
          chords={song.chords}
          youtube={song.youtube}
          status={song.status}
          lyrics={song.lyrics}
        />
      ))}
    </>
  );
};

export default Cards;
