import React from 'react';
import './style.scss';

export default function Loader() {
  return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 300 300"
        className="loader__rotate"
      >
        <path
          d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z"
          fill="#ccc"
        >
        </path>
      </svg>
  );
}
