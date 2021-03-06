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
  const [newestSong, setNewestSong] = useState({
    id: null,
    name: null,
    artist: null,
  });
  const [count, setCount] = useState({
    learned: 0,
    tolearn: 0,
    learning: 0,
  });
  const [songs, setSongs] = useState([]);

  // fetch songs from backend when app is initially rendered
  useEffect(() => {
    fetch("/api/songs")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSongs(data);
      });
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

  // call to Genius API when newestSong is updated (i.e. a song is added)
  useEffect(() => {
    fetchGeniusData(newestSong.name, newestSong.artist).then(
      successCallback,
      failureCallback
    );
  }, [newestSong]);

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
    // design: if user inputs youtube link, that link takes priority over
    // the fetched YT link from the genius API

    setAddShowing(false);
    // console.log("new song added");

    // fetch data from genius api where none is provided

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

    // set newest song for Genius API call in useEffect() hook to access later
    setNewestSong({
      id: songs.length + 1,
      name: song.name,
      artist: song.artist,
    });

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

    // console.log(newSong);
    const response = await fetch(`/api/songs/${newSong.id}`, {
      method: "PUT",
      body: JSON.stringify(newSong),
      // FIXME: headers line might not be technically required
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log("updated song sent to server");
  };

  const filterSongs = (status) => {
    songs.map((song) => {
      // console.log(song.status);
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

    // console.log("songID", songID);
  };

  const markCompleted = async (songID) => {
    // console.log("mark completed");
    // console.log(songID);

    songs.map(async (song) => {
      if (song.id === songID) {
        song.status = "Learned";
        // send PUT request to the server
        const response = await fetch(`/api/songs/${song.id}`, {
          method: "PUT",
          body: JSON.stringify(song),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    });

    setSongs([...songs]);
    setViewCardShowing(false);
  };

  const toggleMobileSidebar = (boolean) => {
    setMobileSidebarShowing(boolean);
    // console.log("toggle mobile sidebar clicked");
  };

  const successCallback = async (result) => {
    console.log("SucCess", result);
    var newSong = {};

    // set song.lyrics to result data & construct a newSong object with edits
    songs.map((song) => {
      if (song.id === newestSong.id) {
        song.lyrics = result;
        if (song.youtube != "") {
          var newYoutube = song.youtube;
        } else {
          console.log("we hit it");
          for (const hit in result) {
            if (hit === "youtube") {
              console.log("yuh");
              var newYoutube = result[hit].slice(-11);
            }
          }
        }
        newSong = {
          id: newestSong.id,
          name: song.name,
          artist: song.artist,
          chords: song.chords,
          youtube: newYoutube,
          status: song.status,
          notes: song.notes,
          lyrics: result,
          visible: song.visible,
        };
      }
    });

    console.log("newSong", newSong);

    // store newSong object in backend
    const response = await fetch(`/api/songs/${newestSong.id}`, {
      method: "PUT",
      body: JSON.stringify(newSong),
      // FIXME: headers line might not be technically required
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };

  const failureCallback = (error) => {
    console.log("Error fulfilling promise:", error);
  };

  const fetchGeniusData = async (song_name, artist_name) => {
    // ACCESS TOKEN ---------------------------------------------------------------------
    const accessToken =
      "qsdfz6yd1U341DT9dPiANrAN67MdHenvI_D8s9g-QnNdmie17u97MhuDrHBr4Upj";

    // query Genius API and return the first hit's song data
    const query = `${song_name.replaceAll(
      " ",
      "%20"
    )}%20${artist_name.replaceAll(" ", "%20")}`;
    const uri = `https://api.genius.com/search?access_token=${accessToken}&q=${query}`;
    const search_response = await fetch(uri);
    const data = await search_response.json();
    // console.log(data);
    // first result of search; currently no checking in place yet
    // If title of first result matches, then show the result
    if (
      data.response.hits[0].result.title.toUpperCase().trim() ===
      song_name.toUpperCase().trim()
    ) {
      // console.log("MATCH FOUND");
    } else {
      console.log(
        "No match found in the Genius Database. Double check spelling of song name and artist name."
      );
    }

    // console.log(data.response.hits[0].result.full_title);
    const api_path = data.response.hits[0].result.api_path;
    const song_uri = `https://api.genius.com${api_path}?access_token=${accessToken}`;
    const song_response = await fetch(song_uri);
    const song_data = await song_response.json();
    // console.log("song data:", song_data);

    const songMedia = {};

    song_data.response.song.media.forEach((media_source) => {
      // console.log(media_source.provider, "link is", media_source.url);
      songMedia[`${media_source.provider}`] = `${media_source.url}`;
    });

    songMedia["genius"] = song_data.response.song.url;
    // console.log("genius link is ", song_data.response.song.url);
    // console.log("song media is ", songMedia);
    return songMedia;
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
