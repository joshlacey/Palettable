import React from 'react';

export default function Loader() {
  return (
    <svg
      style={{ margin: '45% auto', display: 'block' }}
      width="48"
      height="48"
      viewBox="0 0 300 300"
    >
      <path
        d="M 150,0 a 150,150 0 0,1 106.066,256.066 l -35.355,-35.355 a -100,-100 0 0,0 -70.711,-170.711 z"
        fill="#ccc"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 150 150"
          to="360 150 150"
          begin="0s"
          dur=".5s"
          fill="freeze"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
