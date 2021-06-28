import React from "react";

const StatusList = () => {
  return (
    <ul className="list-group">
      <button className="slist list-group-item d-flex justify-content-between align-items-center">
        All
        <span className="badge bg-primary rounded-pill">14</span>
      </button>
      <button className="slist list-group-item d-flex justify-content-between align-items-center">
        Learning In Progress
        <span className="badge bg-primary rounded-pill">14</span>
      </button>
      <button className="slist list-group-item d-flex justify-content-between align-items-center">
        Want to Learn
        <span className="badge bg-primary rounded-pill">2</span>
      </button>
      <button className="slist list-group-item d-flex justify-content-between align-items-center">
        Learned
        <span className="badge bg-primary rounded-pill">1</span>
      </button>
    </ul>
  );
};

export default StatusList;
