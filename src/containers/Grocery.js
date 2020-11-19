import React, { useEffect, useState } from 'react';
import Alert from '../components/Alert';

import List from '../components/List';
import './Grocery.css';

const Grocery = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', msg: '' });

  useEffect(() => {
    const data = localStorage.getItem('grocery-list');
    if (data) setList(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('grocery-list', JSON.stringify(list));
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'Please add an item');
    } else if (name && isEditing) {
      const itemList = [...list];
      const editedList = itemList.map((item) => {
        if (item.id === itemId) {
          return { ...item, itemName: name };
        }
        return item;
      });
      setList(editedList);
      setIsEditing(false);
      setItemId(null);
      setName('');
      showAlert(true, 'success', 'Item uppdated');
    } else {
      const item = {
        id: new Date().getTime().toString(),
        itemName: name,
      };
      setList([...list, item]);
      setName('');
      showAlert(true, 'success', 'One item added to the list');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const deleteHandler = (id) => {
    const itemList = [...list];
    const filteredList = itemList.filter((item) => item.id !== id);
    setList(filteredList);
    showAlert(true, 'danger', 'One item removed');
  };

  const removeAllItems = () => {
    setList([]);
    setIsEditing(false);
    setName('');
    showAlert(true, 'danger', 'All items removed');
  };

  const editHandler = (id) => {
    setItemId(id);
    const item = list.find((item) => item.id === id);
    setName(item.itemName);
    setIsEditing(true);
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={submitHandler}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h1>Grocery Items</h1>
        <div className="form-control">
          <input
            type="text"
            value={name}
            placeholder="e.g. milk"
            className="grocery"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'Edit' : 'Add'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            items={list}
            deleteItem={deleteHandler}
            editItem={editHandler}
          />
          <button className="clear-btn" onClick={removeAllItems}>
            Clear All Items
          </button>
        </div>
      )}
    </section>
  );
};

export default Grocery;
