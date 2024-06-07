import React, { memo, useEffect } from 'react';

import './ruler.css';
import useCustomState from '../../hooks/useCustomState';
import useKeyboard from '../../hooks/useKeyboard';

interface RulerActionProps {
  resetAll?: any;
  selected?: any;
  onCounterChange: (counter: number) => void;
}

interface StateValue {
  counter: number;
  enabled: boolean;
}

export const RulerAction: React.FC<RulerActionProps> = ({resetAll,selected,onCounterChange}) => {
  const setUserPreference = (value: number) => {
    localStorage.setItem('mw-accessibility---ruler', value.toString());
  };

  const getUserPreference = () => {
    const pref = localStorage.getItem('mw-accessibility---ruler');
    if (!pref) {
      return 0;
    }
    return Number(pref);
  };

  const checkIfEnabledBefore = () => {
    return Boolean(getUserPreference());
  };

  const [state, setState] = useCustomState({
    counter: getUserPreference(),
    enabled: checkIfEnabledBefore(),
  });

  useEffect(() => {
    if (state.counter) {
      setUserPreference(1);
    } else {
      setUserPreference(0);
    }
    onCounterChange(state.counter);
  }, [state.enabled, state.counter]);

  useKeyboard(() =>
    setState((prevState: StateValue) => ({
      ...prevState,
      status: false,
      counter: 0,
      enabled: false,
    }))
  );

  const handleClick = () => {
    if (state.counter == 0) {
      setState((prevState: StateValue) => ({
        ...prevState,
        counter: 1,
        enabled: false,
      }));
    } else {
      setState((prevState: StateValue) => ({
        ...prevState,
        counter: 0,
        enabled: true,
      }));
    }
    if (selected !== undefined && selected !== null) {
        selected();
      }
  };

  useEffect(() => {
    if (resetAll) {
      setState((prevState: StateValue) => ({
        ...prevState,
        counter: 0,
        enabled: true,
      }));
    }
  }, [resetAll]);

  return (
    <>
     <button type="button" onClick={handleClick}>
      <div>
        <div style={{ display: "flex", justifyContent: "center", margin: 8 }}>
        <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="24"
                viewBox="0 0 40 24"
                className="icon-text"
                role="presentation"
              >
                <path
                  id="ruler"
                  d="M7,36a2.878,2.878,0,0,1-2.1-.9A2.878,2.878,0,0,1,4,33V15a2.906,2.906,0,0,1,.9-2.075A2.841,2.841,0,0,1,7,12H41a2.841,2.841,0,0,1,2.1.925A2.906,2.906,0,0,1,44,15V33a3.076,3.076,0,0,1-3,3Zm0-3H41V15H34.5v9h-3V15h-6v9h-3V15h-6v9h-3V15H7Zm6.5-9h0Zm9,0h0Zm9,0h0ZM24,24Z"
                  transform="translate(-4 -12)"
                  fill="currentColor"
                />
              </svg>
        </div>
        <p style={{ margin: 12 }}>Ruler</p>
      </div>
    </button> 
    </>
  );
};