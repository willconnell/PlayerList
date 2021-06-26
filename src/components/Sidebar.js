import React from "react";

const Sidebar = () => {
  return (
    <div className="leftnav bg-light col-3">
      <h3>Navigation</h3>
      <p>
        <button className="btn btn-primary">Add Song</button>
      </p>

      <ul class="list-group">
        <button class="list-group-item d-flex justify-content-between align-items-center">
          A list item
          <span class="badge bg-primary rounded-pill">14</span>
        </button>
        <button class="list-group-item d-flex justify-content-between align-items-center">
          A second list item
          <span class="badge bg-primary rounded-pill">2</span>
        </button>
        <button class="list-group-item d-flex justify-content-between align-items-center">
          A third list item
          <span class="badge bg-primary rounded-pill">1</span>
        </button>
      </ul>

      <div class="list-group" id="list-tab" role="tablist">
        <button
          class="list-group-item list-group-item-action active"
          id="list-home-list"
          data-bs-toggle="list"
          href="#list-home"
          role="tab"
          aria-controls="list-home"
        >
          Home
        </button>
        <button
          class="list-group-item list-group-item-action"
          id="list-profile-list"
          data-bs-toggle="list"
          href="#list-profile"
          role="tab"
          aria-controls="list-profile"
        >
          Profile
        </button>
        <button
          class="list-group-item list-group-item-action"
          id="list-messages-list"
          data-bs-toggle="list"
          href="#list-messages"
          role="tab"
          aria-controls="list-messages"
        >
          Messages
        </button>
        <button
          class="list-group-item list-group-item-action"
          id="list-settings-list"
          data-bs-toggle="list"
          href="#list-settings"
          role="tab"
          aria-controls="list-settings"
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
