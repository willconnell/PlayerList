import React from "react";
import { BsX, BsCheck } from "react-icons/bs";

const ViewCard = (props) => {
  const onEdit = () => {
    props.exit();
    // show addmodal card but with current information already filled in
    // create an editmodal component for ^this
    // call function defined in App.js to show the edit modal
    props.toggleEdit(props.song.id);
  };

  const markAsLearned = () => {
    // mark song as learned;
  };

  return (
    <>
      <div className="backdrop" onClick={props.exit} />
      <div className="addmodal">
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
        {/* <iframe src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"></iframe> */}
        {props.song.youtube !== "https://www.youtube.com/embed/" && (
          <iframe width="100%" height="345" src={props.song.youtube}></iframe>
        )}

        <button className="btn btn-outline-dark">Chords / Tabs</button>
        <br />
        {/* {make ^this open into a new window} */}
        <p>Lyrics in a nice format; use Lorem ipsum</p>
        <p>Notes</p>
        <p>Mark as Learned button functionality</p>
        <p>Edit button functionality</p>
        <div className="d-flex">
          <button onClick={onEdit} className="btn btn-secondary m-1">
            Edit
          </button>
          <button onClick={markAsLearned} className="btn btn-light m-1">
            <BsCheck style={{ marginRight: "5px" }} />
            Mark as Learned
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewCard;
