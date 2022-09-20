import React from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Box from './Box/Box';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Section from './Section/Section';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const ourContacts = localStorage.getItem('contacts');
    if (ourContacts) {
      setContacts(JSON.parse(ourContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmit = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return toast.error(`${name} is already in contacts.`);
    }
    setContacts(prevState => [...prevState, { id: nanoid(), name, number }]);
  };

  const handleRemoveContact = id =>
    setContacts(prevState => prevState.filter(contact => contact.id !== id));

  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  return (
    <Box>
      <Section title="PhoneBook">
        <ToastContainer />
        <ContactForm onSubmit={onSubmit} />
      </Section>
      <div>
        <Section title="Contacts">
          <Filter onChange={handleFilterChange} />
          <ContactList
            onRemove={handleRemoveContact}
            contacts={visibleContacts()}
          />
        </Section>
      </div>
    </Box>
  );
}

export default App;
