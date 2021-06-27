import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <h6 className="card-subtitle">by {props.artist}</h6>
        {/* <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p> */}
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          {" "}
          <a href="#link" className="card-link">
            Chords / Tabs
          </a>
        </li>
        <li className="list-group-item">
          {" "}
          <a href="#link" className="card-link">
            Youtube
          </a>
        </li>
        <li className="list-group-item">Lyrics Available</li>
        <li className="list-group-item">Learning Status</li>
      </ul>
    </div>
  );
};

export default Card;
