import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import './List.css';

const List = (props) => {
  const { items, deleteItem, editItem } = props;
  return (
    <React.Fragment>
      {items.map((item) => {
        const { id, itemName } = item;
        return (
          <div className="grocery-item" key={id}>
            <p className="item-name">{itemName}</p>
            <div className="btn-container">
              <button className="edit-btn" onClick={() => editItem(id)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => deleteItem(id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default List;
