import React, { useEffect } from "react";
import useCustomState from "../../hooks/useCustomState";
import { applyStyles, removeStyles } from "../../commonFunc/func";
import "./letterSpacing.css"

interface LetterSpacingProps {
  resetAll?: boolean;
  selected?: () => void;
}

type StateValue = {
  counter: number;
  enabled: boolean;
};
export const LetterSpacing: React.FC<LetterSpacingProps> = ({
  resetAll,
  selected,
}) => {
  const setUserPreference = (value: number) => {
    localStorage.setItem(
      'mw-accessibility---letter-spacing',
      value.toString()
    );
  };

  const getUserPreference = () => {
    const pref = localStorage.getItem('mw-accessibility---letter-spacing');
    if (!pref) {
      return 0;
    }
    return Number(pref);
  };

  const checkIfEnabledBefore = () => {
    return Boolean(getUserPreference());
  };

  const applyStyle = (index: number) => {
    let arrIndex = index - 1;

    if (arrIndex < 0) {
      arrIndex = 0;
    }

    setUserPreference(index);
    return;
  };

  const [state, setState] = useCustomState({
    counter: getUserPreference(),
    enabled: checkIfEnabledBefore(),
  });

  const bodyClassName = "mw-ls";
  const letterSpacingA = "mw-ls-a";
  const letterSpacingB = "mw-ls-b";
  const letterSpacingC = "mw-ls-c";

  useEffect(() => {
    if (state.enabled) {
      switch (state.counter) {
        case 1:
          applyStyle(state.counter);
          applyStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: letterSpacingA,
            addClassB: letterSpacingB,
            addClassC: letterSpacingC,
          });
          break;
        case 2:
          applyStyle(state.counter);
          applyStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: letterSpacingA,
            addClassB: letterSpacingB,
            addClassC: letterSpacingC,
          });
          break;
        case 3:
          applyStyle(state.counter);
          applyStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: letterSpacingA,
            addClassB: letterSpacingB,
            addClassC: letterSpacingC,
          });

          break;
        default:
          setUserPreference(0);
          removeStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: letterSpacingA,
            addClassB: letterSpacingB,
            addClassC: letterSpacingC,
          });

          break;
      }
    } else {
      setUserPreference(0);
      removeStyles({
        counterValue: state.counter,
        bodyClass: bodyClassName,
        addClassA: letterSpacingA,
        addClassB: letterSpacingB,
        addClassC: letterSpacingC,
      });
    }
  }, [state.enabled, state.counter]);
  useEffect(() => {
    if (resetAll) {
      setState({
        counter: 0,
        enabled: true,
      });
    }
  }, [resetAll]);
  const handleClick = () => {
    if (selected !== undefined && selected !== null) {
      selected();
    }
    if (state.counter > 2) {
      setState({
        counter: 0,
        enabled: false,
      });
    } else {
      setState((prevState: StateValue) => ({
        ...prevState,
        counter: prevState.counter + 1,
        enabled: true,
      }));
    }
  };
  return (
    <button type="button" onClick={handleClick}>
      <div>
        <div style={{ display: "flex", justifyContent: "center", margin: 8 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="49.993"
            height="41.489"
            viewBox="0 0 49.993 41.489"
            className="icon-text"
            role="presentation"
          >
            <path
              id="Path_10955"
              data-name="Path 10955"
              d="M7215.372-1604.931a1.49,1.49,0,0,1-.372-.988,1.494,1.494,0,0,1,.335-.944l6.509-8.013,2.327,1.891-4.279,5.269h40.548l-4.586-5.226,2.256-1.978,6.511,7.419a1.5,1.5,0,0,1,.037,1.934l-6.509,8.013-2.328-1.891,4.281-5.271h-40.548l4.584,5.226-2.256,1.98Zm28.453-10.406V-1635.3h-7.766v-3.7h19.227v3.7h-7.763v19.963Zm-13.31,0v-12.572h-4.807v-3.7h13.311v3.7h-4.812v12.572Z"
              transform="translate(-7215 1639)"
              fill="currentColor"
            />
          </svg>
        </div>
        <p style={{ margin: 12 }}>Letter spacing</p>
      </div>
    </button>
  );
};
