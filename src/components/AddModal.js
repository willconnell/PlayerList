import React from "react";
import { BsX } from "react-icons/bs";

const AddModal = (props) => {
  return (
    <>
      <div className="backdrop" />
      <div className="addmodal">
        <div className="modalheading d-flex justify-content-between">
          <span />
          <h1 style={{ textAlign: "center" }}>Add a Song</h1>
          <BsX className="modalX" onClick={props.toggle} />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Song Name
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Something"
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Artist
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="The Beatles"
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Link to Chords / Tabs
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Link to Youtube
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">
            Notes
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Notes"
          ></textarea>
        </div>
        <button className="btn btn-danger m-2" onClick={props.toggle}>
          Discard
        </button>
        <button className="btn btn-success m-2" onClick={props.save}>
          Save Changes
        </button>
      </div>
    </>
  );
};

export default AddModal;
