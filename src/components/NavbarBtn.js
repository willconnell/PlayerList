import React from "react";
import { FiMenu } from "react-icons/fi";

const NavbarBtn = (props) => {
  return (
    <div>
      <button
        onClick={() => props.toggleSidebar(true)}
        className={`${props.hidden && "invisible"} btn btn-light burger`}
      >
        <FiMenu />
        <span className="icon-bar"></span>
      </button>
    </div>
  );
};

export default NavbarBtn;
