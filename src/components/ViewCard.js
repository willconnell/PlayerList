import React from "react";
import { BsX } from "react-icons/bs";

const ViewCard = (props) => {
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
        <iframe width="100%" height="345" src={props.song.youtube}></iframe>

        <button className="btn btn-outline-dark">Chords / Tabs</button>
        <br />
        {/* {make ^this open into a new window} */}
        <p>Lyrics in a nice format; use Lorem ipsum</p>
        <p>Notes</p>
        <p>Mark as Learned button functionality</p>
        <p>Edit button functionality</p>
        <div className="d-flex">
          <button className="btn btn-secondary m-1">Edit</button>
          <button className="btn btn-light m-1">Mark as Learned</button>
        </div>
      </div>
    </>
  );
};

export default ViewCard;
