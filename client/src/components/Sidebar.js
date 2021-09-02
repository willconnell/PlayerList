import React from "react";
import StatusList from "./StatusList.js";

const Sidebar = (props) => {
  return (
    <div className="leftnav bg-light col-3" id="navCollapse">
      <h3>Navigation</h3>
      <p>
        <button className="btn btn-primary" onClick={props.toggle}>
          Add Song
        </button>
      </p>

      <StatusList
        allLen={props.allLen}
        count={props.count}
        filter={props.filter}
      />

      {/* <div className="list-group mt-3" id="list-tab" role="tablist">
        <button
          className="list-group-item list-group-item-action active"
          id="list-home-list"
          data-bs-toggle="list"
          href="#list-home"
          role="tab"
          aria-controls="list-home"
        >
          Home
        </button>
        <button
          className="list-group-item list-group-item-action"
          id="list-profile-list"
          data-bs-toggle="list"
          href="#list-profile"
          role="tab"
          aria-controls="list-profile"
        >
          Profile
        </button>
        <button
          className="list-group-item list-group-item-action"
          id="list-messages-list"
          data-bs-toggle="list"
          href="#list-messages"
          role="tab"
          aria-controls="list-messages"
        >
          Messages
        </button>
        <button
          className="list-group-item list-group-item-action"
          id="list-settings-list"
          data-bs-toggle="list"
          href="#list-settings"
          role="tab"
          aria-controls="list-settings"
        >
          Settings
        </button>
      </div> */}
    </div>
  );
};

export default Sidebar;
