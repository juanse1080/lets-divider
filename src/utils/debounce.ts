const debounce = (func: (...arg: any[]) => any, wait: number = 166) => {
  let timeout: NodeJS.Timeout;
  const debounced = (...args: any[]) => {
    const that = this;
    const later = () => {
      func.apply(that, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
};

export default debounce