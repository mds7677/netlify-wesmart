import * as React from "react";

const InstagramSvg = (props) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 2.5H8C5 2.5 2.5 5 2.5 8v8c0 3 2.5 5.5 5.5 5.5h8c3 0 5.5-2.5 5.5-5.5V8c0-3-2.5-5.5-5.5-5.5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  );
};

export default InstagramSvg;
