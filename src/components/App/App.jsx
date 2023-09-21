import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import baseContacts from '../../data/contacts.json';
import css from './App.module.css';

const LOCALSTORAGE_KEY = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY)) ??
      baseContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(
      LOCALSTORAGE_KEY,
      JSON.stringify(contacts)
    );
  }, [contacts]);

  const addContact = newContact => {
    setContacts(prevState => [...prevState, newContact]);
  };

  const changeFilter = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const getVisibleContacts = () => {
    // const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = id => {
    setContacts(() => contacts.filter(contact => contact.id !== id));
  };

  // const filteredContacts = this.getVisibleContacts();
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <div>
        <ContactForm contacts={contacts} onAddContact={addContact} />

        <h2>Contacts</h2>
        <Filter filter={filter} onChangeFilter={changeFilter} />

        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    </div>
  );
};

export default App;
