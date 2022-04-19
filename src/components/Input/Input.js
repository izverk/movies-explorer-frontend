import './Input.css';

function Input({
	type,
	name,
	id,
	defaultValue,
	labelText,
	minLength,
	maxLength,
	required,
	values,
	handleValuesChange,
	errors,
}) {
	return (
		<div className='input'>
			<label className='input__label' htmlFor={id}>
				{labelText}
			</label>
			<input
				className='input__input'
				type={type}
				defaultValue={defaultValue}
				name={name}
				id={id}
				minLength={minLength}
				maxLength={maxLength}
				required={required}
				values={values}
				onChange={handleValuesChange}
			/>
			<span className={`input__error input__error_active`}>{errors[name]}</span>
			{/* <span className={`input__error${!isValid ? ' input__error_active' : ''}`}>
				{}
			</span> */}
		</div>
	);
}

export default Input;
