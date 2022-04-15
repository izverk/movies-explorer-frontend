import './Input.css';

function Input({ type, name, id, defaultValue, labelText, minLength, maxLength }) {

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
        required
        minLength={minLength}
        maxLength={maxLength}
      />
    </div>
  );
}

export default Input;