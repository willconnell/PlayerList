import "./App.css";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.js";
import Cards from "./components/Cards.js";
import Heading from "./components/Heading.js";
import AddModal from "./components/AddModal.js";
import ViewCard from "./components/ViewCard.js";
import EditModal from "./components/EditModal.js";
import MobileSidebar from "./components/MobileSidebar.js";
import Transition from "react-transition-group/Transition";

function App() {
  const [addShowing, setAddShowing] = useState(false);
  const [viewCardShowing, setViewCardShowing] = useState(false);
  const [viewableSong, setViewableSong] = useState("");
  const [editShowing, setEditShowing] = useState(false);
  const [mobileSidebarShowing, setMobileSidebarShowing] = useState(false);
  const [count, setCount] = useState({
    learned: 0,
    tolearn: 0,
    learning: 0,
  });
  const [songs, setSongs] = useState([]);

  // practice call to the genius API
  useEffect(async () => {
    const accessToken = "[sensitive info]";
    const query = "something%20the%20beatles";
    // const uri = `https://api.genius.com/search?access_token=${accessToken}&q=${query}`;
    // const uri = `https://api.genius.com/songs/87564?access_token=${accessToken}`;
    const uri = `https://api.genius.com/songs/78960?access_token=${accessToken}`;

    const response = await fetch(uri);
    const data = await response.json();
    console.log(data);
    console.log("youtube link is", data.response.song.media[1].url);
  });

  // fetch songs from backend when app is initially rendered
  useEffect(() => {
    fetch("/api/songs")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSongs(data);
      });
    console.log("songs retrieved from backend");
  }, []);

  // count songs for sidebar numbers
  useEffect(() => {
    let tolearn = 0;
    let learning = 0;
    let learned = 0;

    songs.map((song) => {
      if (song.status === "To Learn") {
        tolearn += 1;
      } else if (song.status === "In Progress") {
        learning += 1;
      } else if (song.status === "Learned") {
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
    // close mobile sidebar if it's opened
    setMobileSidebarShowing(false);
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
  };

  const exitViewCard = () => {
    setViewCardShowing(false);
  };

  const addSong = async (song) => {
    setAddShowing(false);
    console.log("new song added");
    setSongs([
      ...songs,
      {
        id: songs.length + 1,
        name: song.name,
        artist: song.artist,
        chords: song.chords,
        youtube: song.youtube,
        status: song.status,
        notes: song.notes,
        lyrics: song.lyrics,
        visible: true,
      },
    ]);

    // send song data to backend server
    const response = await fetch("/api/songs", {
      method: "POST",
      body: JSON.stringify(song),
      // FIXME: headers line might not be technically required
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    console.log("song sent to server");
  };

  const saveEditedSong = async (newSong) => {
    songs.map(async (song) => {
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

    console.log(newSong);
    const response = await fetch(`/api/songs/${newSong.id}`, {
      method: "PUT",
      body: JSON.stringify(newSong),
      // FIXME: headers line might not be technically required
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("updated song sent to server");
  };

  const filterSongs = (status) => {
    songs.map((song) => {
      console.log(song.status);
      if (status === "All") {
        song.visible = true;
      } else if (song.status === status) {
        song.visible = true;
      } else {
        song.visible = false;
      }
    });
    setSongs([...songs]);
    // close mobile sidebar if it's open
    setMobileSidebarShowing(false);
  };

  const deleteSong = async (songID) => {
    // delete song from UI
    setSongs(songs.filter((song) => song.id !== songID));
    setEditShowing(false);

    // delete from backend with API call
    fetch(`/api/songs/${songID}`, {
      method: "DELETE",
    });
  };

  const markCompleted = (songID) => {
    console.log("mark completed");
    console.log(songID);

    songs.map((song) => {
      if (song.id === songID) {
        song.status = "Learned";
      }
    });

    setSongs([...songs]);
    setViewCardShowing(false);
    // include animation with the mark as completed button if possible; (to show user that it worked)
  };

  const toggleMobileSidebar = (boolean) => {
    setMobileSidebarShowing(boolean);
    console.log("toggle mobile sidebar clicked");
  };

  return (
    <div className="App">
      <Sidebar
        toggle={toggleAddShowing}
        allLen={songs.length}
        count={count}
        filter={filterSongs}
      />

      <Transition
        in={mobileSidebarShowing}
        timeout={400}
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <MobileSidebar
            state={state}
            toggle={toggleAddShowing}
            allLen={songs.length}
            count={count}
            filter={filterSongs}
            toggleSidebar={toggleMobileSidebar}
          />
        )}
      </Transition>

      {/* {mobileSidebarShowing && (
        <MobileSidebar
          toggle={toggleAddShowing}
          allLen={songs.length}
          count={count}
          filter={filterSongs}
          toggleSidebar={toggleMobileSidebar}
        />
      )} */}

      <Transition in={viewCardShowing} timeout={400} mountOnEnter unmountOnExit>
        {(state) => (
          <ViewCard
            state={state}
            toggle={toggleViewCard}
            toggleEdit={toggleEditShowing}
            song={viewableSong}
            exit={exitViewCard}
            markCompleted={markCompleted}
          />
        )}
      </Transition>

      {/* <Transition in={addShowing} timeout={400} mountOnEnter unmountOnExit>
        {(state) => (
          <AddModal
            state={state}
            toggle={toggleAddShowing}
            onAddSong={addSong}
          />
        )}
      </Transition> */}

      {/* FIXME: including below line until I can fix bug with the above transition */}
      {addShowing && <AddModal toggle={toggleAddShowing} onAddSong={addSong} />}

      <Transition in={editShowing} timeout={400} mountOnEnter unmountOnExit>
        {(state) => (
          <EditModal
            state={state}
            toggle={toggleEditShowing}
            // probably will need to edit this so it doesn't create an entire new song
            onAddSong={addSong}
            song={viewableSong}
            saveChanges={saveEditedSong}
            deleteSong={deleteSong}
          />
        )}
      </Transition>

      <Heading toggleSidebar={toggleMobileSidebar} />
      <div className="container">
        <div className="row cards-container offset-md-3 d-flex">
          {/* <Cards songs={songs} toggle={toggleViewCard} /> */}
          {songs.length === 0 ? (
            <p>No Songs</p>
          ) : (
            <Cards songs={songs} toggle={toggleViewCard} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
