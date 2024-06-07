import { useEffect, useState } from "react";

const isFunction = (functionToCheck: any) => {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
};

const useCustomState = (initialState: any) => {
  const [state, setValue] = useState(initialState);

  const usePrevState = (prevState: any, newValues: any) => ({
    ...prevState,
    ...newValues,
  });

  const setState = (cb: any) => {
    const values = isFunction(cb)
      ? cb
      : (prevState: any) => usePrevState(prevState, cb);
    setValue(values);
  };

  return [state, setState];
};

export default useCustomState;
