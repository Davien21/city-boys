export const arrowVariants = {
  open: { rotate: 0 },
  closed: { rotate: 180 },
};

export const menuVariants = {
  enter: {
    opacity: 1,
    y: 0,
    display: "block",
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export const dropDownVariants = {
  enter: {
    opacity: 1,
    top: 50,
    display: "block",
  },
  exit: {
    top: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export const ModalParentVariants = {
  enter: {
    opacity: 1,
    transition: {
      duration: 0.15,
    },
    display: "block",
  },
  exit: { opacity: 0, transitionEnd: { display: "none" } },
};

export const accordionVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transitionEnd: { display: "block" },
  },
  closed: {
    opacity: 0,
    height: 0,
    transitionEnd: { display: "none" },
  },
};

export const PanelVariants = {
  shrink: {
    padding: "10px",
  },
  grow: {
    padding: "50px",
  },
};

export const slideIn = {
  display: "block",
  opacity: 1,
  y: 0,
  transition: { duration: 0.15 },
};

export const slideOut = {
  opacity: 0,
  y: -10,
  transition: { duration: 0.15 },
  transitionEnd: { display: "none" },
};

export const fadeIn = {
  // display: "block" ,
  opacity: 1,
  transition: { duration: 0.15 },
};

export const fadeOut = {
  opacity: 0,
  transition: { duration: 0.15 },
  // transitionEnd: { display: "none" },
};

export const shakeAnimation = {
  shake: {
    x: [-5, 5, -5, 5, -2, 2, -2, 2, 0],
    y: [-1, 1, -1, 1, -0.5, 0.5, -0.5, 0.5, 0],
    transition: {
      x: { type: "tween", duration: 0.5, repeat: Infinity },
      y: { type: "tween", duration: 0.5, repeat: Infinity },
    },
  },
  rest: {
    x: 0,
    y: 0,
  },
};
