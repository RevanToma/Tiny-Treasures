import { SVGProps } from "react";

const SendButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={39}
    height={43}
    fill="none"
    {...props}
  >
    <path
      fill="#61A4F3"
      d="M.816 4.678c0-3.079 3.333-5.003 6-3.464l29.25 16.888c2.666 1.54 2.666 5.388 0 6.928L6.816 41.917c-2.667 1.54-6-.385-6-3.464V4.678Z"
    />
  </svg>
);
export default SendButton;
