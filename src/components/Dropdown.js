import React from 'react';

const Dropdown = ({ items, onChange, defaultOption }) => {
  return (
    <select className="w-100 p-2 rounded bg-light" onChange={onChange} defaultValue={defaultOption} id="bikeType">
      <option disabled="disabled" value="">
        {' '}
      </option>
      {items.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
