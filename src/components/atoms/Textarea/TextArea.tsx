import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";

// import PropTypes from "prop-types";

import Tooltip from "../Tooltip";

import { useTheme, useForkRef } from "hooks";

import { debounce } from "utils";

import {
  Root,
  Label,
  TextArea,
  HelperText,
  TextAreaRoot,
  TextAreaHidden,
  HelperRoot,
} from "./TextArea.styles";
import { darken } from "utils/colorManipulator";

const useEnhancedEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const getStyleValue = (computedStyle: object, property: string) => {
  const prop = property as keyof object;
  return parseInt(computedStyle[prop], 10) || 0;
};

export declare type TextAreaProps = {
  id?: string;
  label?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  readOnly?: boolean;
  required?: boolean;
  value?: string;
  name?: string;
  warning?:
    | {
        content?: string;
        title?: string;
      }
    | string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
  helperText?: string;
  helperTextInfo?: (length: number, maxLength: number) => string;
  placeholder?: string;
  textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  rows?: number;
  rowsMax?: number;
  rowsMin?: number;
  maxLength?: number;
} & React.HTMLAttributes<HTMLElement>;

const TextAreaBase = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id = "text-area",
      label = "",
      disabled,
      readOnly,
      required,
      fullWidth = false,
      error = false,
      textAreaProps = {},
      value,
      name,
      warning,
      defaultValue,
      onChange: defaultOnChange,
      onBlur: defaultOnBlur,
      onFocus: defaultOnFocus,
      helperText = "",
      helperTextInfo,
      placeholder,
      rows,
      rowsMax,
      rowsMin: rowsMinProp = 1,
      maxLength = 250,
      ...props
    },
    ref
  ) => {
    const { content, title } =
      warning && typeof warning === "object"
        ? warning
        : {
            content: undefined,
            title: undefined,
          };

    const rowsMin = rows || rowsMinProp;

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const handleRef = useForkRef(ref, inputRef);
    const shadowRef = useRef<HTMLTextAreaElement>(null);

    const [state, setState] = useState<string>(value || defaultValue || "");
    const [style, setStyle] = useState<{
      outerHeightStyle: number;
      overflow: boolean;
    }>({
      outerHeightStyle: 0,
      overflow: false,
    });
    const [focus, setFocus] = useState<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (defaultOnChange) defaultOnChange(e);
      setState(e.target.value);
    };

    const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (disabled || readOnly) {
        e.stopPropagation();
        return;
      }

      if (defaultOnFocus) defaultOnFocus(e);
      setFocus(true);
    };

    const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (disabled) {
        e.stopPropagation();
        return;
      }

      if (defaultOnBlur) defaultOnBlur(e);
      setFocus(false);
    };

    const syncHeight = useCallback(
      (input: HTMLTextAreaElement, inputShallow: HTMLTextAreaElement) => {
        const computedStyle = window.getComputedStyle(input);

        inputShallow.style.width = computedStyle.width;
        inputShallow.value = input.value || placeholder || "x";
        if (inputShallow.value.slice(-1) === "\n") {
          inputShallow.value += " ";
        }

        const boxSizing = computedStyle["boxSizing"];

        const padding =
          getStyleValue(computedStyle, "padding-bottom") +
          getStyleValue(computedStyle, "padding-top");
        const border =
          getStyleValue(computedStyle, "border-bottom-width") +
          getStyleValue(computedStyle, "border-top-width");

        const innerHeight = inputShallow.scrollHeight - padding;

        inputShallow.value = "x";
        const singleRowHeight = inputShallow.scrollHeight - padding;

        let outerHeight = innerHeight;

        if (rowsMin) {
          outerHeight = Math.max(rowsMin * singleRowHeight, outerHeight);
        }
        if (rowsMax) {
          outerHeight = Math.min(rowsMax * singleRowHeight, outerHeight);
        }
        outerHeight = Math.max(outerHeight, singleRowHeight);

        const outerHeightStyle =
          outerHeight + (boxSizing === "border-box" ? padding + border : 0);
        const overflow = Math.abs(outerHeight - innerHeight) <= 1;

        setStyle((prevState) => {
          if (
            (outerHeightStyle > 0 &&
              Math.abs(prevState.outerHeightStyle - outerHeightStyle) > 1) ||
            prevState.overflow !== overflow
          ) {
            return {
              overflow,
              outerHeightStyle,
            };
          }

          return prevState;
        });
      },
      [rowsMax, rowsMin, placeholder]
    );

    useEffect(() => {
      const handleResize = debounce(() => {
        if (inputRef.current !== null && shadowRef.current !== null) {
          const inputRefCopy = inputRef.current as HTMLTextAreaElement;
          const shadowRefCopy = shadowRef.current as HTMLTextAreaElement;
          syncHeight(inputRefCopy, shadowRefCopy);
        }
      });

      window.addEventListener("resize", handleResize);
      return () => {
        handleResize.clear();
        window.removeEventListener("resize", handleResize);
      };
    }, [syncHeight]);

    useEnhancedEffect(() => {
      if (inputRef.current !== null && shadowRef.current !== null) {
        const inputRefCopy = inputRef.current as HTMLTextAreaElement;
        const shadowRefCopy = shadowRef.current as HTMLTextAreaElement;
        syncHeight(inputRefCopy, shadowRefCopy);
      }
    });

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

    const newTextAreaProps = {
      ...textAreaProps,
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
      rows,
      rowsMax,
      maxLength,
      style: {
        height: style.outerHeightStyle,
        overflow: style.overflow ? "hidden" : "visible",
      },
    };

    const textAreaHiddenProps = {
      ref: shadowRef,
      className: props.className,
      readOnly: true,
      tabIndex: -1,
      style: props.style,
      "aria-hidden": true,
    };

    const labelProps = {
      theme,
      style: styleLabel,
      htmlFor: id,
      shrink: focus || !isBlank || !!placeholder,
    };

    const textAreaRootProps = {
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

    const helperTextInfoProps = {
      ...helperTextProps,
      children: helperTextInfo
        ? helperTextInfo(state.length, maxLength)
        : `${state.length}/${maxLength}`,
    };

    return (
      <Root fullWidth={fullWidth} disabled={disabled} {...props}>
        {warning ? (
          <Label {...labelProps}>
            <Tooltip content={content} title={title}>
              {label}
            </Tooltip>
          </Label>
        ) : (
          <Label {...labelProps}>{label}</Label>
        )}
        <HelperText align="right" variant="p1" {...helperTextInfoProps} />
        <TextAreaRoot {...textAreaRootProps}>
          <TextArea {...newTextAreaProps} />
          <TextAreaHidden {...textAreaHiddenProps} />
        </TextAreaRoot>
        <HelperRoot>
          <HelperText align="left" variant="p1" {...helperTextProps} />
        </HelperRoot>
      </Root>
    );
  }
);

/* @ts-ignore */
// TextAreaBase.propTypes = {
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
//   textAreaProps: PropTypes.object,
// };

export default TextAreaBase;
