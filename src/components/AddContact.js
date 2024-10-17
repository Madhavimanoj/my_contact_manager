import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContact = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All the fields are mandatory!");
      return;
    }
    props.addContactHandler({ name, email });
    setName("");
    setEmail("");

    navigate("/");
  };

  return (
    <div className="ui main">
      <h2 style={{margin: " 2 auto" ,fontSize:"40px", padding:"12px"}}>Add Contact</h2>
      <form style={{background:"pink" , maxWidth:"800px", margin: "0 auto" , padding:"70px", border:"10px solid #ccc", borderRadius:"25px" }} className="ui form" onSubmit={add}>
        <div className="field">
          <label style={{fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "bolder", fontSize: "20px"}}>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{width:"80%", fontSize:"20px"}}
          />
        </div>
        <div className="field">
          <label style={{fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "bolder", fontSize: "20px"}}>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{width:"80%", fontSize:"20px"}}
          />
        </div>
        <div className="flex-container">
          <button className="a">Add Contact</button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
