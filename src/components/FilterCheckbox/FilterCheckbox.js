import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({
	shortFilmsCheckboxValue,
	setShortFilmsCheckboxValue,
}) {
	const handleInputChange = (e) => {
		setShortFilmsCheckboxValue(e.target.checked);
	};

	return (
		<label className='filter'>
			<input
				type='checkbox'
				checked={shortFilmsCheckboxValue}
				className='filter__checkbox'
				name='filterCheckbox'
				onChange={handleInputChange}
			/>
			<span className='filter__pseudo-checkbox' />
			Короткометражки
		</label>
	);
}

export default FilterCheckbox;
