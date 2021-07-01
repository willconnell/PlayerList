import React from "react";
import { BsX } from "react-icons/bs";

const ViewCard = (props) => {
  return (
    <>
      <div className="backdrop" />
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
        <p>Link to Chords Badge</p>
        <p>Embedded youtube video</p>
        <p>Lyrics in a nice format; use Lorem ipsum</p>
        <p>Mark as Learned button</p>
        <p>Edit button</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
      </div>
    </>
  );
};

export default ViewCard;
