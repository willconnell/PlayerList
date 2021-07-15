import Card from "./Card.js";
import Transition from "react-transition-group/Transition";

const Cards = (props) => {
  return (
    <>
      {props.songs.map((song) => (
        <>
          <Transition
            in={song.visible}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            {(state) => (
              <Card
                id={song.id}
                name={song.name}
                artist={song.artist}
                chords={song.chords}
                youtube={song.youtube}
                status={song.status}
                lyrics={song.lyrics}
                toggle={props.toggle}
                state={state}
              />
            )}
          </Transition>
        </>
      ))}
    </>
  );
};

export default Cards;
