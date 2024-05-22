import React, { useEffect } from "react";
import useCustomState from "../../hooks/useCustomState/useCustomState";
import { applyStyles, removeStyles } from "../../commonFunc/func";
import "./fontSize.css";

interface FontSizeProps {
  resetAll?: boolean;
  selected?: () => void;
}

type StateValue = {
  counter: number;
  enabled: boolean;
};
export const FontSize: React.FC<FontSizeProps> = ({ resetAll, selected }) => {
  const setUserPreference = (value: number) => {
    localStorage.setItem("mw-accessibility---font-size", value.toString());
  };

  const getUserPreference = () => {
    const pref = localStorage.getItem("mw-accessibility---font-size");
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

  const bodyClassName = "mw-font-font";
  const fontSizeA = "mw-font-a";
  const fontSizeB = "mw-font-b";
  const fontSizeC = "mw-font-c";

  useEffect(() => {
    if (state.enabled) {
      switch (state.counter) {
        case 1:
          applyStyle(state.counter);
          applyStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: fontSizeA,
            addClassB: fontSizeB,
            addClassC: fontSizeC,
          });
          break;
        case 2:
          applyStyle(state.counter);
          applyStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: fontSizeA,
            addClassB: fontSizeB,
            addClassC: fontSizeC,
          });
          break;
        case 3:
          applyStyle(state.counter);
          applyStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: fontSizeA,
            addClassB: fontSizeB,
            addClassC: fontSizeC,
          });

          break;
        default:
          setUserPreference(0);
          removeStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: fontSizeA,
            addClassB: fontSizeB,
            addClassC: fontSizeC,
          });

          break;
      }
    } else {
      setUserPreference(0);
      removeStyles({
        counterValue: state.counter,
        bodyClass: bodyClassName,
        addClassA: fontSizeA,
        addClassB: fontSizeB,
        addClassC: fontSizeC,
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
            width="40"
            height="32"
            viewBox="0 0 40 32"
            className="icon-text"
            role="presentation"
          >
            <path
              id="format_size_FILL0_wght400_GRAD0_opsz48"
              d="M28.5,40V13H18V8H44v5H33.5V40Zm-18,0V23H4V18H22v5H15.5V40Z"
              transform="translate(-4 -8)"
              fill="currentColor"
            />
          </svg>
        </div>
        <p style={{ margin: 12 }}>Font size</p>
      </div>
    </button>
  );
};
