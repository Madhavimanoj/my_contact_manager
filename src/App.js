import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import api from './api/contacts';
import './App.css';
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import EditContact from './components/EditContact';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const retrieveContacts = async () => {
    try {
      const response = await api.get('/contacts');
      return response.data;
    } catch (error) {
      console.error("Error retrieving contacts:", error);
      return [];
    }
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    try {
      const response = await api.post('/contacts', request);
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const updateContactHandler = async (contact) => {
    const { id } = contact;
    try {
      const response = await api.put(`/contacts/${id}`, contact);
      setContacts(
        contacts.map((contact) => {
          return contact.id === id ? { ...response.data } : contact;
        })
      );
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };
  
  const removeContactHandler = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      const newContactList = contacts.filter((contact) => {
        return contact.id !== id;
      });
      setContacts(newContactList);
    } catch (error) {
      console.error("Error removing contact:", error);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  return (
    <div className="ui container">
      <Header />
      <Switch>
        <Route 
          path="/" 
          exact
          component={() => (
            <ContactList 
              contacts={searchTerm.length < 1 ? contacts : searchResults} 
              getContactId={removeContactHandler} 
              term={searchTerm} 
              searchKeyword={searchHandler} 
            />
          )}
        />
        <Route 
          path="/add" 
          component={() => <AddContact addContactHandler={addContactHandler} />} 
        />
        <Route 
          path="/edit/:id" 
          component={() => <EditContact updateContactHandler={updateContactHandler} />} 
        />
        <Route 
          path="/contact/:id" 
          component={ContactDetail} 
        />
      </Switch>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
