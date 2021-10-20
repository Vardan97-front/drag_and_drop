import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

export default function Wrapper({ children }) {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  children: PropTypes.any.isRequired,
};
