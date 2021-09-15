import React from "react";
import { useState, useEffect } from "react";
import { BsX, BsCheck } from "react-icons/bs";

const ViewCard = (props) => {
  const [spotify, setSpotify] = useState(null);
  const [soundcloud, setSoundcloud] = useState(null);
  const [genius, setGenius] = useState(null);
  const [youtube, setYoutube] = useState(null);

  const onEdit = () => {
    props.exit();
    // show addmodal card but with current information already filled in
    // create an editmodal component for ^this
    // call function defined in App.js to show the edit modal
    props.toggleEdit(props.song.id);
  };

  useEffect(() => {
    showMedia();
  }, []);

  const showMedia = () => {
    if (props.song.lyrics === "") {
      console.log("lyrics is empty");
    } else {
      console.log(props.song.lyrics);
      for (const media in props.song.lyrics) {
        if (media === "genius") {
          setGenius(props.song.lyrics[media]);
        } else if (media === "soundcloud") {
          setSoundcloud(props.song.lyrics[media]);
        } else if (media === "spotify") {
          setSpotify(props.song.lyrics[media]);
        } else if (media === "youtube" && props.song.youtube === "") {
          console.log("new youtube link set");
          setYoutube(props.song.lyrics[media]);
        }
      }
    }
  };

  // const markAsLearned = () => {
  //   // mark song as learned;
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
      <div className={backdropClasses.join(" ")} onClick={props.exit} />
      <div className={modalClasses.join(" ")}>
        <div className="modalheading d-flex justify-content-between">
          <span />
          <h1 style={{ textAlign: "center" }}>{props.song.name}</h1>
          <BsX className="modalX" onClick={props.toggle} />
        </div>
        <div className="modalheading d-flex justify-content-between">
          <span />
          <h2 style={{ textAlign: "center" }}>by {props.song.artist}</h2>
          {/* keep modalX here for consistent layout, but make it invisible and non-functional */}
          <BsX className="modalX hidden" />
        </div>
        {props.song.youtube !== "" && (
          <iframe
            width="100%"
            height="345"
            src={`https://www.youtube.com/embed/${props.song.youtube}`}
          ></iframe>
        )}

        <div>
          {spotify != null && (
            <a
              className="btn btn-outline-dark m-2"
              href={spotify}
              target="_blank"
              rel="noreferrer"
            >
              Listen on Spotify
            </a>
          )}
          <br />
          {genius != null && (
            <a
              className="btn btn-outline-dark m-2"
              href={genius}
              target="_blank"
              rel="noreferrer"
            >
              View Lyrics
            </a>
          )}
          <br />
          {soundcloud != null && (
            <a
              className="btn btn-outline-dark m-2"
              href={soundcloud}
              target="_blank"
              rel="noreferrer"
            >
              Listen on Soundcloud
            </a>
          )}
        </div>

        <div className="notes-container">
          <h6>
            <strong>Notes</strong>
          </h6>
          <span>{props.song.notes}</span>
        </div>
        <div className="d-flex">
          <button onClick={onEdit} className="btn btn-secondary m-1">
            Edit
          </button>
          <button
            onClick={() => props.markCompleted(props.song.id)}
            className="btn btn-light m-1"
          >
            <BsCheck style={{ marginRight: "5px" }} />
            Mark as Learned
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewCard;
