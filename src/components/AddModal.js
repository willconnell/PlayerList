import React from "react";
import { useState } from "react";
import { BsX } from "react-icons/bs";

const AddModal = (props) => {
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [chords, setChords] = useState("");
  const [youtube, setYoutube] = useState("");
  const [status, setStatus] = useState("To Learn");
  const [notes, setNotes] = useState("");
  const [lyrics, setLyrics] = useState("");

  const onSubmit = (e) => {
    // convert youtube link to embed link
    const code = youtube.slice(-11);
    const newlink = "https://www.youtube.com/embed/" + code;

    const song = {
      id: Math.random() * 10 + 1,
      name: songName,
      artist: artist,
      chords: chords,
      youtube: newlink,
      status: status,
      notes: notes,
      lyrics: lyrics,
    };
    props.onAddSong(song);
  };

  return (
    <>
      <div className="backdrop" />
      <form className="addmodal" onSubmit={onSubmit}>
        <div className="modalheading d-flex justify-content-between">
          <span />
          <h1 style={{ textAlign: "center" }}>Add a Song</h1>
          <BsX className="modalX" onClick={props.toggle} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Song Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Something"
            onChange={(e) => setSongName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Artist
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="The Beatles"
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Link to Chords / Tabs
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="http://example.com"
            onChange={(e) => setChords(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Link to Youtube
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="http://example.com"
            onChange={(e) => setYoutube(e.target.value)}
          />
        </div>

        <label className="form-label">Status:</label>
        <div className="form-check" onChange={(e) => setStatus(e.target.value)}>
          <input
            className="form-check-input"
            type="radio"
            id="radio-learning"
            name="status"
            value="In Progress"
            checked
          />
          <label htmlFor="radio-learning">Learning In Progress</label>
          <br />
          <input
            className="form-check-input"
            type="radio"
            id="radio-tolearn"
            name="status"
            value="To Learn"
          />
          <label htmlFor="radio-tolearn">Want to Learn</label>
          <br />
          <input
            className="form-check-input"
            type="radio"
            id="radio-learned"
            name="status"
            value="Learned"
          />
          <label htmlFor="radio-learned">Learned</label>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Notes
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Notes"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-danger m-2"
          onClick={props.toggle}
        >
          Discard
        </button>
        <button type="submit" className="btn btn-success m-2">
          Save Changes
        </button>
      </form>
    </>
  );
};

export default AddModal;
