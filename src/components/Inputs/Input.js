import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

export default function Input({
  type, name, label, value, change, blur, error,
}) {
  const [id] = useState(_.uniqueId('input_'));

  return (
    <label htmlFor={id}>
      <p>{label}</p>
      <input
        id={id}
        className={error ? 'error' : 'success'}
        name={name}
        type={type}
        value={value}
        onChange={(ev) => change(ev.target.name, ev.target.value)}
        onBlur={() => blur(name)}
      />
      {error ? <span>{error}</span> : null}
    </label>
  );
}

Input.defaultProps = {
  value: '',
  error: null,
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
};
