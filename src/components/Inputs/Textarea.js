import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

export default function Textarea({
  label, name, value, change, blur, error, row,
}) {
  const [id] = useState(_.uniqueId('textarea_'));

  return (
    <label htmlFor={id} className="textareaLabel">
      <p>{label}</p>
      <textarea
        name={name}
        className={error ? 'error' : 'success'}
        id={id}
        value={value}
        onChange={(ev) => change(ev.target.name, ev.target.value)}
        onBlur={() => blur(name)}
        rows={row}
      />
      {error ? <span>{error}</span> : null}
    </label>
  );
}

Textarea.defaultProps = {
  value: '',
  error: null,
};

Textarea.propTypes = {
  value: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  blur: PropTypes.func.isRequired,
};
