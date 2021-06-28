import "./App.css";
import { useState } from "react";
import Sidebar from "./components/Sidebar.js";
import Cards from "./components/Cards.js";
import Heading from "./components/Heading.js";

import AddModal from "./components/AddModal.js";

function App() {
  const [addShowing, setAddShowing] = useState(false);
  const [songs, setSongs] = useState([
    {
      id: 1,
      name: "Something",
      artist: "The Beatles",
      chords:
        "https://tabs.ultimate-guitar.com/tab/the-beatles/something-chords-335727",
      youtube: "https://www.youtube.com/watch?v=UelDrZ1aFeY",
      status: "Learned",
      notes: "",
      lyrics: "",
    },
    {
      id: 2,
      name: "Neon",
      artist: "John Mayer",
      chords: "https://tabs.ultimate-guitar.com/tab/john-mayer/neon-tabs-48164",
      youtube: "https://www.youtube.com/watch?v=_DfQC5qHhbo",
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
      youtube: "https://www.youtube.com/watch?v=0vo23H9J8o8",
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
      youtube: "https://www.youtube.com/watch?v=lwlogyj7nFE",
      status: "Learned",
      notes: "",
      lyrics: "",
    },
  ]);

  const toggleAddShowing = () => {
    setAddShowing(!addShowing);
  };

  const saveSong = () => {
    setAddShowing(!addShowing);
    console.log("save new song info");
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

  return (
    <div className="App">
      <Sidebar toggle={toggleAddShowing} />
      {addShowing && (
        <AddModal
          toggle={toggleAddShowing}
          save={saveSong}
          onAddSong={addSong}
        />
      )}

      <Heading />
      <div className="container">
        <div className="row cards-container offset-3 d-flex">
          <Cards songs={songs} />
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
