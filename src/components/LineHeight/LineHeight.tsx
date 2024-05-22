import React, { useEffect } from "react";
import useCustomState from "../../hooks/useCustomState/useCustomState";
import { applyStyles, removeStyles } from "../../commonFunc/func";
import "./lineHeight.css";

interface LineHeightProps {
  resetAll?: boolean;
  selected?: () => void;
}

type StateValue = {
  counter: number;
  enabled: boolean;
};
export const LineHeight: React.FC<LineHeightProps> = ({
  resetAll,
  selected,
}) => {
  const setUserPreference = (value: number) => {
    localStorage.setItem("mw-accessibility---line-height", value.toString());
  };

  const getUserPreference = () => {
    const pref = localStorage.getItem("mw-accessibility---line-height");
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

  const bodyClassName = "mw-lineheight";
  const lineHeightA = "mw-lh-a";
  const lineHeightB = "mw-lh-b";
  const lineHeightC = "mw-lh-c";

  useEffect(() => {
    if (state.enabled) {
      switch (state.counter) {
        case 1:
          applyStyle(state.counter);
          applyStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: lineHeightA,
            addClassB: lineHeightB,
            addClassC: lineHeightC,
          });
          break;
        case 2:
          applyStyle(state.counter);
          applyStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: lineHeightA,
            addClassB: lineHeightB,
            addClassC: lineHeightC,
          });
          break;
        case 3:
          applyStyle(state.counter);
          applyStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: lineHeightA,
            addClassB: lineHeightB,
            addClassC: lineHeightC,
          });

          break;
        default:
          setUserPreference(0);
          removeStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: lineHeightA,
            addClassB: lineHeightB,
            addClassC: lineHeightC,
          });

          break;
      }
    } else {
      setUserPreference(0);
      removeStyles({
        counterValue: state.counter,
        bodyClass: bodyClassName,
        addClassA: lineHeightA,
        addClassB: lineHeightB,
        addClassC: lineHeightC,
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
            width="63.156"
            height="34.002"
            viewBox="0 0 63.156 34.002"
            className="icon-text"
            role="presentation"
          >
            <path
              id="Path_10956"
              data-name="Path 10956"
              d="M7240.706-1605v-4h24v4Zm-17.648-1.081-8.013-6.51,1.89-2.327,5.27,4.281v-23.311l-5.226,4.585-1.98-2.256,7.421-6.508a1.5,1.5,0,0,1,1.935-.038l8.013,6.51-1.893,2.329-5.27-4.281v23.309l5.226-4.585,1.98,2.256-7.421,6.51a1.49,1.49,0,0,1-.988.373A1.491,1.491,0,0,1,7223.057-1606.081Zm17.648-8.919v-4h37.448v4Zm0-10v-4h37.448v4Zm0-10v-4h37.448v4Z"
              transform="translate(-7214.998 1639.001)"
              fill="currentColor"
            />
          </svg>
        </div>
        <p style={{ margin: 12 }}>Line height</p>
      </div>
    </button>
  );
};
