import React from 'react';
import './NavBottom.css';

const NavBottom = () => {
  return (
    <nav id="second-nav" className="d-flex justify-content-between second-nav text-light">
      <div className="d-flex">
          <p className="align-self-center m-1 boardname">&nbsp;Trello Clone&nbsp;</p>
          <button className="btn btn-sm text-light m-1"><i className="far fa-star"></i></button>
          <p className="align-self-center m-1 team">&nbsp;Private Team&nbsp;</p>
          <button className="btn btn-sm text-light m-1"><i className="fa fa-users"></i>&nbsp;&nbsp;Team Visible</button>
          <button className="btn btn-sm text-light m-1">&nbsp;Invite&nbsp;</button>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-sm text-light m-1"><i className="fa fa-cogs"></i></button>
          <button className="btn btn-sm text-light m-1"><i className="fa fa-ellipsis-h"></i>&nbsp;&nbsp;Show Menu</button>
        </div>
    </nav>
  );
};

export default NavBottom;