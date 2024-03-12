import React from 'react';
import PropTypes from 'prop-types';

const IceCreamImage = ({ imgURL }) =>
  imgURL != null && <img src={imgURL} alt="" />;

IceCreamImage.propTypes = {
  iceCreamId: PropTypes.number,
};

export default IceCreamImage;
