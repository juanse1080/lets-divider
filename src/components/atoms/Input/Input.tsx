import React, { forwardRef, useState, useRef } from "react";

// import PropTypes from "prop-types";

import Tooltip from "../Tooltip";

import { useTheme, useForkRef } from "hooks";

import {
  Root,
  Label,
  Input as InputStyled,
  HelperText,
  InputRoot,
  Adornment,
} from "./Input.styles";
import { darken } from "utils/colorManipulator";

export declare type InputProps = {
  id?: string;
  label?: string;
  fullWidth?: boolean;
  error?: boolean;
  warning?:
    | {
        content?: string;
        title?: string;
      }
    | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  helperText?: string;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.HTMLAttributes<HTMLElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label = "",
      disabled,
      readOnly,
      required,
      fullWidth = false,
      error = false,
      inputProps = {},
      value,
      name,
      type,
      warning,
      defaultValue,
      onChange: defaultOnChange,
      onBlur: defaultOnBlur,
      onFocus: defaultOnFocus,
      helperText = "",
      placeholder,
      endAdornment,
      startAdornment,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef(null);
    const handleRef = useForkRef(ref, inputRef);

    const { content, title } =
      warning && typeof warning === "object"
        ? warning
        : {
            content: warning as string,
            title: undefined,
          };

    const [state, setState] = useState<string | number | readonly string[]>(
      value || defaultValue || ""
    );
    const [focus, setFocus] = useState<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (defaultOnChange) defaultOnChange(e);
      setState(e.target.value);
    };

    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        e.stopPropagation();
        return;
      }

      if (defaultOnFocus) defaultOnFocus(e);
      setFocus(true);
    };

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (disabled) {
        e.stopPropagation();
        return;
      }

      if (defaultOnBlur) defaultOnBlur(e);
      setFocus(false);
    };

    const theme = useTheme();
    const { palette, value: currentTheme } = theme;

    const isBlank = !state && !value;

    const styleLabel: object = {
      "--color": !focus
        ? palette.grey[currentTheme]
        : palette.secondary[currentTheme],
    };

    const styleInputRoot: object = {
      "--color": error
        ? palette.error[currentTheme]
        : darken(theme.common.white, 0.3),
      "--border": error
        ? palette.error[currentTheme]
        : palette.secondary[currentTheme],
      "--scale": error || focus ? "scaleX(1)" : "scaleX(0)",
    };

    const styleHelperText: object = {
      "--color": error
        ? palette.error[currentTheme]
        : palette.grey[currentTheme],
    };

    const newInputProps = {
      ...inputProps,
      type,
      theme,
      id,
      value,
      name,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      ref: handleRef,
      disabled,
      readOnly,
      required,
      placeholder,
    };

    const labelProps = {
      theme,
      style: styleLabel,
      htmlFor: id,
      shrink: focus || !isBlank || !!startAdornment || !!placeholder,
    };

    const inputRootProps = {
      theme,
      style: styleInputRoot,
      disabled,
      readOnly,
    };

    const helperTextProps = {
      theme,
      style: styleHelperText,
      children: helperText,
    };

    return (
      <Root fullWidth={fullWidth} disabled={disabled} {...props}>
        {warning ? (
          <Label variant="p1" component="label" {...labelProps}>
            <Tooltip content={content} title={title}>
              {label}
            </Tooltip>
          </Label>
        ) : (
          <Label variant="p1" component="label" {...labelProps}>
            {label}
          </Label>
        )}
        <InputRoot {...inputRootProps}>
          {startAdornment && (
            <Adornment orientation="start" theme={theme}>
              {startAdornment}
            </Adornment>
          )}
          <InputStyled {...newInputProps} />
          {endAdornment && (
            <Adornment orientation="end" theme={theme}>
              {endAdornment}
            </Adornment>
          )}
        </InputRoot>
        {helperText && <HelperText variant="p1" {...helperTextProps} />}
      </Root>
    );
  }
);

/* @ts-ignore */
// Input.propTypes = {
//   id: PropTypes.string,
//   label: PropTypes.string,
//   disabled: PropTypes.bool,
//   fullWidth: PropTypes.bool,
//   error: PropTypes.bool,
//   readOnly: PropTypes.bool,
//   required: PropTypes.bool,
//   value: PropTypes.string,
//   name: PropTypes.string,
//   warning: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.shape({ content: PropTypes.string, title: PropTypes.string }),
//   ]),
//   onChange: PropTypes.func,
//   onFocus: PropTypes.func,
//   onBlur: PropTypes.func,
//   defaultValue: PropTypes.string,
//   helperText: PropTypes.string,
//   placeholder: PropTypes.string,
//   endAdornment: PropTypes.node,
//   startAdornment: PropTypes.node,
//   inputProps: PropTypes.object,
// };

export default Input;
