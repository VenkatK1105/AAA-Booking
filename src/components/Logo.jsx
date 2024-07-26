/* eslint-disable no-unused-vars */
import React from "react";

// eslint-disable-next-line react/prop-types
const Logo = ({ src, alt, width, height, style }) => {
  return (
    <img src={src} alt={alt} width={width} height={height} style={style} />
  );
};

export default Logo;
