import React, { Dispatch, SetStateAction, useEffect } from "react";
import Link from "next/link";
import styles from "./button.module.scss";
import { SpinnerIcon } from "components";
import { IComponentState } from "interfaces";

type IFormType = "primary" | "secondary";

function Button({
  disabled,
  form = "primary",
  children,
  className,
  onClick,
  type = "button",
  state = "idle",
  onChangeState,
  href,
  ...rest
}: {
  disabled?: boolean;
  form?: IFormType;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  rest?: any;
  state?: IComponentState;
  href?: string;
  onChangeState?: Dispatch<SetStateAction<IComponentState>>;
}) {
  let containerClass = `${styles.container} font-secondary`;
  if (className) containerClass += ` ${className}`;
  if (form) containerClass += ` ${styles[form]}`;
  const isLoading = state === "loading";

  if (href) {
    return (
      <Link href={href}>
        <a className={containerClass} onClick={onClick} {...rest}>
          {isLoading === true && <SpinnerIcon />}
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={containerClass}
      {...rest}
      disabled={disabled || isLoading}
    >
      {isLoading === true && <SpinnerIcon />}
      <div>{children}</div>
    </button>
  );
}

export { Button };
