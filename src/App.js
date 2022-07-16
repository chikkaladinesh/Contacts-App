import './App.css';
import { useEffect, useState } from 'react';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import Header from './components/Header';
import {BrowserRouter as Router, Route, Switch }  from "react-router-dom";
import ContactDetails  from  './components/ContactDetails'
function App() {
  const LOCAL_STORAGE_KEY ="contacts"
  const [contacts, setContacts] = useState([])

  const removeContactHandler = id => {
  const newContact = contacts.filter(contact => contact.id !== id);
  setContacts(newContact);
}
  const addContactHandler = contact => {
    setContacts([...contacts, {id: contacts.length, ...contact}])
  }

useEffect(() => {
  const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if(retriveContacts) {
    setContacts(retriveContacts);
  }
},[])

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
},[contacts])

  return (
     <div className="ui container">
      <Router>
      <Header />
<Switch>
  <Route path="/" exact component={()=><ContactList contacts={contacts}
  getContactId={removeContactHandler}/>} />
  <Route path="/add" component={(props)=> <AddContact {...props}addContactHandler={addContactHandler}/>} />
  <Route path="/contact/:id" component={ContactDetails} />
</Switch>
      </Router>
    </div>
      );
  
}

export default App;
