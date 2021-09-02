const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// sample database for now below
let songs = [
  {
    id: 2,
    name: "Neon",
    artist: "John Mayer",
    chords: "https://tabs.ultimate-guitar.com/tab/john-mayer/neon-tabs-48164",
    youtube: "_DfQC5qHhbo",
    status: "In Progress",
    notes: "Some sample notes for Neon",
    lyrics: "",
    visible: true,
  },
  {
    id: 3,
    name: "Pride and Joy",
    artist: "Stevie Ray Vaughn",
    chords:
      "https://tabs.ultimate-guitar.com/tab/stevie-ray-vaughan-double-trouble/pride-and-joy-tabs-30829",
    youtube: "0vo23H9J8o8",
    status: "In Progress",
    notes: "Some sample notes for Pride and Joy",
    lyrics: "",
    visible: true,
  },
  {
    id: 4,
    name: "Under the Bridge",
    artist: "Red Hot Chili Peppers",
    chords:
      "https://tabs.ultimate-guitar.com/tab/red-hot-chili-peppers/under-the-bridge-tabs-3832",
    youtube: "lwlogyj7nFE",
    status: "To Learn",
    notes: "Some sample notes for Under the Bridge",
    lyrics: "",
    visible: true,
  },
  {
    id: 1,
    name: "Something",
    artist: "The Beatles",
    chords:
      "https://tabs.ultimate-guitar.com/tab/the-beatles/something-chords-335727",
    youtube: "UelDrZ1aFeY",
    status: "Learned",
    notes: "Some sample notes for Something",
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
  console.log("POST: song received on server", song);
  // console.log(songs);
});

// set up GET request
app.get("/api/songs", (req, res) => {
  res.json(songs);
  console.log("GET songs");
});

// get request for checking specific songs; used for debugging
app.get("/api/songs/:id", (req, res) => {
  const song = songs.find((c) => c.id === parseInt(req.params.id));
  if (!song) res.status(404).send("404: Song not found");
  res.send(song);
});

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});

// set up PUT request
app.put("/api/songs/:id", (req, res) => {
  const song = songs.find((c) => c.id === parseInt(req.params.id));
  if (!song) res.status(404).send("404: Song not found");

  song.name = req.body.name;
  song.artist = req.body.artist;
  song.chords = req.body.chords;
  song.youtube = req.body.youtube;
  song.status = req.body.status;
  song.notes = req.body.notes;
  song.lyrics = req.body.lyrics;
  song.visible = true;
  res.send(song);
  console.log("PUT", req.body);
});

// set up DELETE request
app.delete("/api/songs/:id", (req, res) => {
  const song = songs.find((c) => c.id === parseInt(req.params.id));
  console.log("tHE ID", req.params.id);
  const index = songs.indexOf(song);
  songs.splice(index, 1);
  res.send(song);
  console.log("DELETING index ", index);
  console.log("the song", song);
  console.log("id", req.params.id);
});

const practice = async () => {
  const page_response = await fetch(
    "https://genius.com/Frank-ocean-super-rich-kids-lyrics"
  );
  const text = await page_response.text();
  const dom = await new JSDOM(text);
  console.log(dom.window.document.querySelector("div").textContent);
};

// send all other get requests to return to react app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

practice();
