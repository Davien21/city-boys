import { motion } from "framer-motion";

const Path = (props: any) => (
  <motion.path
    fill="#fff"
    strokeWidth="3"
    strokeLinecap="round"
    strokecolor="#fff"
    {...props}
  />
);

export const CloseButton = ({
  strokeColor,
  toggle,
  className,
  ...rest
}: {
  strokeColor?: string;
  toggle: () => void;
  className?: string;
}) => {
  className
    ? (className = `menu_toggle ml-auto ${className}`)
    : (className = "menu_toggle ml-auto");
  return (
    <button className={className} onClick={toggle}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 25.5C6.09625 25.5 0.5 19.9037 0.5 13C0.5 6.09625 6.09625 0.5 13 0.5C19.9037 0.5 25.5 6.09625 25.5 13C25.5 19.9037 19.9037 25.5 13 25.5ZM13 11.2325L9.465 7.69625L7.69625 9.465L11.2325 13L7.69625 16.535L9.465 18.3038L13 14.7675L16.535 18.3038L18.3038 16.535L14.7675 13L18.3038 9.465L16.535 7.69625L13 11.2325Z"
          fill="white"
        />
      </svg>
    </button>
  );
};
