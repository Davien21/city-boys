import React, { Dispatch, SetStateAction, useEffect } from "react";
import Link from "next/link";
import styles from "./button.module.scss";
import { SpinnerIcon } from "components";
import { IComponentState } from "interfaces";

type IFormType = "primary" | "secondary" | "tertiary" | "unstyled";

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
  target = "_self",
  rel,
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
  rel?: string;
  target?: React.HTMLAttributeAnchorTarget;
  onChangeState?: Dispatch<SetStateAction<IComponentState>>;
}) {
  let containerClass = `${styles.container} font-secondary`;
  if (className) containerClass += ` ${className} flex gap-x-3 items-center`;
  if (form) containerClass += ` ${styles[form]}`;
  if (state === "loading") containerClass += ` ${styles["loading"]}`;
  const isLoading = state === "loading";
  if (rel && href) (rest as any).rel = rel;
  if (href && target === "_blank" && !rel)
    (rest as any).rel = "noopener noreferrer";

  if (href) {
    return (
      <Link href={href}>
        <a
          className={containerClass}
          onClick={onClick}
          {...rest}
          target={target}
        >
          {isLoading === true && <SpinnerIcon />}
          <div>{children}</div>
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
      onClick={onClick}
    >
      <div>{children}</div>
      {isLoading === true && <SpinnerIcon />}
    </button>
  );
}

export { Button };
