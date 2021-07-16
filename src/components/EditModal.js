import React from "react";
import { useState, useEffect } from "react";
import { BsX, BsTrash } from "react-icons/bs";

const EditModal = (props) => {
  const [songid, setSongid] = useState("");
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [chords, setChords] = useState("");
  const [youtube, setYoutube] = useState("");
  const [status, setStatus] = useState("To Learn");
  const [notes, setNotes] = useState("");
  const [lyrics, setLyrics] = useState("");

  // the first time the modal is rendered, set song parameters (so they're not empty)
  useEffect(() => {
    console.log("EFFECT RUNNING");
    setSongid(props.song.id);
    setSongName(props.song.name);
    setArtist(props.song.artist);
    setChords(props.song.chords);
    setYoutube(props.song.youtube);
    setStatus(props.song.status);
    setNotes(props.song.notes);
    setLyrics(props.song.lyrics);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    // if (youtube != "https://www.youtube.com/embed/") {
    //   const code = youtube.slice(-11);
    //   const newlink = "https://www.youtube.com/embed/" + code;
    // } else {
    //   const newlink = "";
    // }

    const code = youtube.slice(-11);
    const newlink = "https://www.youtube.com/embed/" + code;

    const song = {
      id: songid,
      name: songName,
      artist: artist,
      chords: chords,
      youtube: newlink,
      status: status,
      notes: notes,
      lyrics: lyrics,
    };

    props.saveChanges(song);
    props.toggle();
  };

  // const onDelete = () => {
  //   console.log("Song Deleted!");
  // };
  const modalClasses = [
    "addmodal",
    props.state === "entering"
      ? "enteringCard"
      : props.state === "exiting"
      ? "exitingCard"
      : "",
  ];

  const backdropClasses = [
    "backdrop",
    props.state === "entering"
      ? "enteringBackdrop"
      : props.state === "exiting"
      ? "exitingBackdrop"
      : "",
  ];

  return (
    <>
      <div className={backdropClasses.join(" ")} />
      <form className={modalClasses.join(" ")} onSubmit={onSubmit}>
        <div className="modalheading d-flex justify-content-between">
          <span />
          <h1 style={{ textAlign: "center" }}>Edit Song</h1>
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
            defaultValue={props.song.name}
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
            defaultValue={props.song.artist}
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
            defaultValue={props.song.chords}
            onChange={(e) => setChords(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Link to Youtube
          </label>
          {props.song.youtube !== "https://www.youtube.com/embed/" ? (
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              defaultValue={props.song.youtube}
              placeholder="http://example.com"
              onChange={(e) => setYoutube(e.target.value)}
            />
          ) : (
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="http://example.com"
              onChange={(e) => setYoutube(e.target.value)}
            />
          )}
        </div>

        <label className="form-label">Status:</label>
        <div className="form-check" onChange={(e) => setStatus(e.target.value)}>
          {props.song.status === "In Progress" ? (
            <input
              className="form-check-input"
              type="radio"
              id="radio-learning"
              name="status"
              value="In Progress"
              defaultChecked
            />
          ) : (
            <input
              className="form-check-input"
              type="radio"
              id="radio-learning"
              name="status"
              value="In Progress"
            />
          )}
          <label htmlFor="radio-learning">Learning In Progress</label>
          <br />

          {props.song.status === "To Learn" ? (
            <input
              className="form-check-input"
              type="radio"
              id="radio-tolearn"
              name="status"
              value="To Learn"
              defaultChecked
            />
          ) : (
            <input
              className="form-check-input"
              type="radio"
              id="radio-tolearn"
              name="status"
              value="To Learn"
            />
          )}
          <label htmlFor="radio-tolearn">Want to Learn</label>
          <br />
          {props.song.status === "Learned" ? (
            <input
              className="form-check-input"
              type="radio"
              id="radio-learned"
              name="status"
              value="Learned"
              defaultChecked
            />
          ) : (
            <input
              className="form-check-input"
              type="radio"
              id="radio-learned"
              name="status"
              value="Learned"
            />
          )}
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
            defaultValue={props.song.notes}
            placeholder="Notes"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-secondary m-2"
          onClick={props.toggle}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger m-2"
          onClick={() => {
            props.deleteSong(props.song.id);
          }}
        >
          <BsTrash style={{ marginRight: "5px" }} />
          Delete Song
        </button>
        <button type="submit" className="btn btn-success m-2">
          Save Changes
        </button>
      </form>
    </>
  );
};

export default EditModal;
