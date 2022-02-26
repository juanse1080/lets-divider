import { ForwardedRef, useMemo } from 'react'

import setRef from '../utils/setRef'

type refType = ForwardedRef<HTMLElement> | ((value: any) => void) | undefined;

const useForkRef = (refA: refType, refB: refType) => {
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue: any) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
};

export default useForkRef