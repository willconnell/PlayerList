import React from "react";
import NavbarBtn from "./NavbarBtn.js";

const Heading = (props) => {
  return (
    <div className="d-flex justify-content-between offset-md-3">
      <NavbarBtn toggleSidebar={props.toggleSidebar} />
      <h1>PlayerList</h1>
      <NavbarBtn hidden="true" />
    </div>
  );
};

export default Heading;
