import React from 'react';
import PropTypes from 'prop-types';

export default function Button({
  text, className, click, type,
}) {
  return (
    <button
      type={type ? 'submit' : 'button'}
      className={`button ${className}`}
      onClick={type ? null : click}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  type: false,
  click: null,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  click: PropTypes.func,
  type: PropTypes.bool,
};
