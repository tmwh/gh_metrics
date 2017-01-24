import React, { PropTypes } from 'react';

const Metricx = ({ name, updateValue }) => (
  <div>
    <h3>
      Hello, {name}!
    </h3>
    <hr />
    <form >
      <label htmlFor="name">
        Say hello to:
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => updateValue(e.target.value)}
      />
    </form>
  </div>
);

Metricx.propTypes = {
  name: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
};

export default Metricx;
