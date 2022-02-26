import { ForwardedRef } from 'react'

type refType = ForwardedRef<HTMLElement> | ((value: any) => void) | undefined;

const setRef = (ref: refType, value: any) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
};

export default setRef