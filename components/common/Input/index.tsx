import React, { useState, SyntheticEvent } from "react";
import styles from "./input.module.scss";
import { FormikProps } from "formik";
import { EyeIcon } from "assets/images";

type InputType = {
  type?: string;
  onClick?: () => void;
  label?: string;
  className?: string;
  id?: string;
  name: string;
  form: 'primary';
  formik?: FormikProps<any>;
  placeholder?: string | "";
  autocomplete?: string;
  [key: string]: any;
};

function Input({
  autocomplete = "on",
  type = "text",
  onClick,
  label,
  className,
  id,
  name,
  form = "primary",
  formik,
  ...rest
}: InputType) {
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  const error: any =
    (formik?.touched[name] && formik?.errors?.[name]) || rest?.error;
  let classes = `${styles.container} `;
  if (className) classes += ` ${className} `;
  classes += ` ${styles[form]} `;
  if (error) classes += styles["error"];
  let placeholder = rest.placeholder;
  if (formik) {
    Object.assign(rest, {
      onChange: formik?.handleChange,
      onBlur: (e: SyntheticEvent) => {
        setIsFocused(false);
        return formik?.handleBlur(e);
      },
      value: formik?.values[name],
    });
  }
  return (
    <div className={classes}>
      {label && (
        <label
          className={isFocused ? `${styles["active"]}` : ""}
          htmlFor={`${name}`}
        >
          {label}
        </label>
      )}
      <div className={`${styles["input-container"]}`}>
        <input
          autoComplete={autocomplete}
          id={`${name}`}
          name={name}
          type={!isShowingPassword ? type : "text"}
          onClick={onClick}
          onFocus={() => setIsFocused(true)}
          {...rest}
          placeholder={placeholder || label}
        />
        {type === "password" && (
          <div className="flex items-center">
            <button
              onClick={() => setIsShowingPassword(!isShowingPassword)}
              type="button"
              className={`${styles["password-svg"]} p-4 pl-0`}
            >
              <EyeIcon />
            </button>
          </div>
        )}
      </div>
      {error && <div className={`${styles["error-message"]}`}>{error}</div>}
    </div>
  );
}

export { Input };
