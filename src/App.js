import "./App.css";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.js";
import Cards from "./components/Cards.js";
import Heading from "./components/Heading.js";
import AddModal from "./components/AddModal.js";
import ViewCard from "./components/ViewCard.js";
import EditModal from "./components/EditModal.js";

function App() {
  const [addShowing, setAddShowing] = useState(false);
  const [viewCardShowing, setViewCardShowing] = useState(false);
  const [viewableSong, setViewableSong] = useState("");
  const [editShowing, setEditShowing] = useState(false);
  const [count, setCount] = useState({
    learned: 0,
    tolearn: 0,
    learning: 0,
  });
  const [songs, setSongs] = useState([
    {
      id: 2,
      name: "Neon",
      artist: "John Mayer",
      chords: "https://tabs.ultimate-guitar.com/tab/john-mayer/neon-tabs-48164",
      youtube: "https://www.youtube.com/embed/_DfQC5qHhbo",
      status: "In Progress",
      notes: "",
      lyrics: "",
    },
    {
      id: 3,
      name: "Pride and Joy",
      artist: "Stevie Ray Vaughn",
      chords:
        "https://tabs.ultimate-guitar.com/tab/stevie-ray-vaughan-double-trouble/pride-and-joy-tabs-30829",
      youtube: "https://www.youtube.com/embed/0vo23H9J8o8",
      status: "In Progress",
      notes: "",
      lyrics: "",
    },
    {
      id: 4,
      name: "Under the Bridge",
      artist: "Red Hot Chili Peppers",
      chords:
        "https://tabs.ultimate-guitar.com/tab/red-hot-chili-peppers/under-the-bridge-tabs-3832",
      youtube: "https://www.youtube.com/embed/lwlogyj7nFE",
      status: "To Learn",
      notes: "",
      lyrics: "",
    },
    {
      id: 1,
      name: "Something",
      artist: "The Beatles",
      chords:
        "https://tabs.ultimate-guitar.com/tab/the-beatles/something-chords-335727",
      youtube: "https://www.youtube.com/embed/UelDrZ1aFeY",
      status: "Learned",
      notes: "",
      lyrics: "",
    },
  ]);

  // run code first time the App is rendered, and everytime song state changes
  useEffect(() => {
    let tolearn = 0;
    let learning = 0;
    let learned = 0;

    songs.map((song) => {
      if (song.status == "To Learn") {
        tolearn += 1;
      } else if (song.status == "In Progress") {
        learning += 1;
      } else if (song.status == "Learned") {
        learned += 1;
      }
    });

    setCount({
      learned: learned,
      tolearn: tolearn,
      learning: learning,
    });
  }, [songs]);

  const toggleAddShowing = () => {
    setAddShowing(!addShowing);
  };

  const toggleEditShowing = () => {
    setEditShowing(!editShowing);
  };

  const toggleViewCard = (id) => {
    setViewCardShowing(!viewCardShowing);
    // fetch song data by id and store in viewableSong
    songs.map((song) => {
      if (song.id === id) {
        setViewableSong(song);
      }
    });
    // console.log(songs.id);
  };

  const exitViewCard = () => {
    setViewCardShowing(false);
  };

  const addSong = (song) => {
    setAddShowing(false);
    console.log("new song added");
    setSongs([
      ...songs,
      {
        id: song.id,
        name: song.name,
        artist: song.artist,
        chords: song.chords,
        youtube: song.youtube,
        status: song.status,
        notes: song.notes,
        lyrics: song.lyrics,
      },
    ]);
  };

  const saveEditedSong = (newSong) => {
    console.log(newSong);

    songs.map((song) => {
      if (song.id === newSong.id) {
        song.name = newSong.name;
        song.artist = newSong.artist;
        song.chords = newSong.chords;
        song.youtube = newSong.youtube;
        song.status = newSong.status;
        song.notes = newSong.notes;
        song.lyrics = newSong.lyrics;
      }
    });

    console.log(songs);
  };

  return (
    <div className="App">
      <Sidebar toggle={toggleAddShowing} allLen={songs.length} count={count} />
      {viewCardShowing && (
        <ViewCard
          toggle={toggleViewCard}
          toggleEdit={toggleEditShowing}
          song={viewableSong}
          exit={exitViewCard}
        />
      )}
      {addShowing && <AddModal toggle={toggleAddShowing} onAddSong={addSong} />}

      {editShowing && (
        <EditModal
          toggle={toggleEditShowing}
          // probably will need to edit this so it doesn't create an entire new song
          onAddSong={addSong}
          song={viewableSong}
          saveChanges={saveEditedSong}
        />
      )}

      <Heading />
      <div className="container">
        <div className="row cards-container offset-3 d-flex">
          <Cards songs={songs} toggle={toggleViewCard} />
          {/* {songs.length === 0 ? (
            <p>No Songs to Show</p>
          ) : (
            <Cards songs={songs} />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default App;
