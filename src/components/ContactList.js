import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const inputEl = useRef(""); // Corrected variable name from inputE1 to inputEl

  // Function to handle delete confirmation
  const deleteContactHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      props.getContactId(id);
    }
  };

  // Rendering the list of contacts using ContactCard component
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler} // Pass deleteContactHandler as clickHandler prop
        key={contact.id}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };                    

  return (
    <div className="main">
      <h2 style={{position: "absolute", backgroundColor: "lavender", textDecoration:"underline", padding: "10px 20px", borderRadius: "5px",
 top: "100px",left: "150px", fontSize: "2.3em", fontWeight: "bolder",color: "purple"}}>Contact List</h2>
      <div className="btn">
        <Link to="/add">
          <button className="addcontact_button">Add Contact</button>
        </Link>
      </div>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
            style={{fontSize:"24px"}}
          />
          <i className="search icon"></i>
        </div>
      </div>

      <div className="ui celled list">
        {renderContactList.length > 0 ? renderContactList : "No Contacts available"}
      </div>
    </div>
  );
};

export default ContactList;
