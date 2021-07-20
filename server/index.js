const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

// sample database for now below
let songs = [
  {
    id: 2,
    name: "Neon from server",
    artist: "John Mayer from server",
    chords: "https://tabs.ultimate-guitar.com/tab/john-mayer/neon-tabs-48164",
    youtube: "https://www.youtube.com/embed/_DfQC5qHhbo",
    status: "In Progress",
    notes: "",
    lyrics: "",
    visible: true,
  },
  {
    id: 3,
    name: "Pride and Joy from server",
    artist: "Stevie Ray Vaughn from server",
    chords:
      "https://tabs.ultimate-guitar.com/tab/stevie-ray-vaughan-double-trouble/pride-and-joy-tabs-30829",
    youtube: "https://www.youtube.com/embed/0vo23H9J8o8",
    status: "In Progress",
    notes: "",
    lyrics: "",
    visible: true,
  },
  {
    id: 4,
    name: "Under the Bridge from server",
    artist: "Red Hot Chili Peppers from server",
    chords:
      "https://tabs.ultimate-guitar.com/tab/red-hot-chili-peppers/under-the-bridge-tabs-3832",
    youtube: "https://www.youtube.com/embed/lwlogyj7nFE",
    status: "To Learn",
    notes: "",
    lyrics: "",
    visible: true,
  },
  {
    id: 1,
    name: "Something from server",
    artist: "The Beatles from server",
    chords:
      "https://tabs.ultimate-guitar.com/tab/the-beatles/something-chords-335727",
    youtube: "https://www.youtube.com/embed/UelDrZ1aFeY",
    status: "Learned",
    notes: "",
    lyrics: "",
    visible: true,
  },
];

// POST request
app.post("/api/songs", (req, res) => {
  const song = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist,
    chords: req.body.chords,
    youtube: req.body.youtube,
    status: req.body.status,
    notes: req.body.notes,
    lyrics: req.body.lyrics,
    visible: true,
    // visible: req.body.visible,
  };
  songs.push(song);
  res.send(song);
  console.log("POST: song received on server");
  console.log(songs);
});

// set up GET request
app.get("/api/songs", (req, res) => {
  res.json(songs);
  console.log("GET: ", songs);
});

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
