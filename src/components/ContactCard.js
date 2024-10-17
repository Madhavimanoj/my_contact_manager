import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;

  return (
    <div className="main_div">
    
    <div className="div1">
  
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link to={`/contact/${id}`} state={{ contact: props.contact }}>
          <div className="header">{name}</div>
        </Link>
        <div className="e">{email}</div>
      </div>
     <div className="div2">
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: '12px', float: 'right', fontSize: '20px' , marginLeft:"10px"}}
        onClick={() => props.clickHandler(id)}
      ></i>
      <Link
        to={{ pathname: `/edit/${id}`, state: { contact: props.contact } }}
      >
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: '12px', float: 'right', fontSize: '20px'  }}
        ></i>
      </Link>

      </div>
    </div>
    </div>
    
    
    
  );
};

export default ContactCard;
