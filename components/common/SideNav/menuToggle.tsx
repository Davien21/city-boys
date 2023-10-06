/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { MenuIcon } from "assets/images";
import styles from "./side-nav.module.css"

function MenuToggle({ onToggleMenu }: {
  onToggleMenu: () => void;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.85 }}
      onClick={onToggleMenu}
      className={`cursor-pointer md:hidden menu_toggle`}
    >
      <MenuIcon />
    </motion.div>
  );
}

export default MenuToggle;
