import React, { PropTypes } from 'react';

const Link = (props) => {
  if (props.active)
     return (<span>{props.children}</span>);
  return(
    <a href="#"
      onClick={
        e => {
          e.preventDefault();
          props.onClick();
        }}
      >
      {props.children}
    </a>
  );
}

export default Link;
