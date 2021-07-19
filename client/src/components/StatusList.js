import React from "react";
// import { useState } from "react";

const StatusList = (props) => {
  // const [numAll, setNumAll] = useState(0);
  // const [numLearning, setNumLearning] = useState(0);
  // const [numToLearn, setNumToLearn] = useState(0);
  // const [numLearned, setNumLearned] = useState(0);

  return (
    <ul className="list-group">
      <button
        onClick={() => {
          props.filter("All");
        }}
        className="slist list-group-item d-flex justify-content-between align-items-center"
      >
        All
        <span className="badge bg-primary rounded-pill">{props.allLen}</span>
      </button>
      <button
        onClick={() => {
          props.filter("In Progress");
        }}
        className="slist list-group-item d-flex justify-content-between align-items-center"
      >
        Learning In Progress
        <span className="badge bg-primary rounded-pill">
          {props.count.learning}
        </span>
      </button>
      <button
        onClick={() => {
          props.filter("To Learn");
        }}
        className="slist list-group-item d-flex justify-content-between align-items-center"
      >
        Want to Learn
        <span className="badge bg-primary rounded-pill">
          {props.count.tolearn}
        </span>
      </button>
      <button
        onClick={() => {
          props.filter("Learned");
        }}
        className="slist list-group-item d-flex justify-content-between align-items-center"
      >
        Learned
        <span className="badge bg-primary rounded-pill">
          {props.count.learned}
        </span>
      </button>
    </ul>
  );
};

export default StatusList;
