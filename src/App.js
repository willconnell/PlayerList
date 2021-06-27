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
      chords: "",
      youtube: "",
      status: "",
      lyrics: "",
    },
    {
      id: 2,
      name: "Neon",
      artist: "John Mayer",
      chords: "",
      youtube: "",
      status: "",
      lyrics: "",
    },
    {
      id: 3,
      name: "Pride and Joy",
      artist: "Stevie Ray Vaughn",
      chords: "",
      youtube: "",
      status: "",
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

  return (
    <div className="App">
      <Sidebar toggle={toggleAddShowing} />
      {addShowing && <AddModal toggle={toggleAddShowing} save={saveSong} />}

      <Heading />
      <div className="container">
        <div className="row offset-3 d-flex justify-content-around">
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
