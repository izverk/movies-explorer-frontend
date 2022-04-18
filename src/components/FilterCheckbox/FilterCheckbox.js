import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({
	moviesSearchCheckboxState,
	setMoviesSearchCheckboxState,
}) {
	const handleInputChange = (e) => {
		setMoviesSearchCheckboxState(e.target.checked);
	};

	return (
		<label className='filter'>
			<input
				type='checkbox'
				checked={moviesSearchCheckboxState}
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
