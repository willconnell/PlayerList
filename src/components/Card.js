import React from "react";

const Card = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Song Name</h5>
        <h6 className="card-subtitle">Artist Name</h6>
        {/* <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p> */}
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">Chords / Tabs</li>
        <li className="list-group-item">Link to Youtube / Spotify</li>
        <li className="list-group-item">Lyrics</li>
      </ul>
      <div className="card-body">
        <a href="#" className="card-link">
          Card link
        </a>
        <a href="#" className="card-link">
          Another link
        </a>
      </div>
    </div>
  );
};

export default Card;
