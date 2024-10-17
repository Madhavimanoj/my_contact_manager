import React from "react";
import { Link, useLocation } from "react-router-dom";
import user from "../images/user.png";

const ContactDetail = () => {
  const location = useLocation();
  const contact = location.state?.contact;

  // Check if contact exists, otherwise render null or a fallback UI
  if (!contact) {
    return (
      <div className="main">
        <div>Contact not found.</div>
        <div className="center-div">
          <Link to="/">
            <button className="backButton">Back to Contact List</button>
          </Link>
        </div>
      </div>
    );
  }

  const { name, email } = contact;

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="headerr">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="backButton">Back to Contact List</button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
