import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/contacts';

const EditContact = ({ updateContactHandler }) => {
  const { id } = useParams();
  const [contact, setContact] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const retrieveContact = async (id) => {
    try {
      const response = await api.get(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving contact:", error);
      return null;
    }
  };

  useEffect(() => {
    const getContact = async () => {
      const contactToEdit = await retrieveContact(id);
      if (contactToEdit) setContact(contactToEdit);
    };
    getContact();
  }, [id]);

  const update = (e) => {
    e.preventDefault();
    if (contact.name === "" || contact.email === "") {
      alert("All fields are mandatory!");
      return;
    }
    updateContactHandler(contact);
    navigate("/");
  };

  return (
    <div className="ui main">
      <h2 style={{fontSize:"35px", marginBottom:"20px", color:"purple"}}>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label >Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label >Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
