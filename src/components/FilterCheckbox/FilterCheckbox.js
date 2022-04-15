import React, { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  const [disabled] = useState(false);

  return (
    <label className='filter'>
      <input className='filter__checkbox' type='checkbox' disabled={disabled ? true : false} />
      <span className='filter__pseudo-checkbox' />
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;