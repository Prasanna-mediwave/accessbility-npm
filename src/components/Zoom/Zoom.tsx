import React, { useEffect } from "react";
import useCustomState from "../../hooks/useCustomState";
import { applyStyles, removeStyles } from "../../commonFunc/func";
import "./zoom.css";

interface ZoomProps {
  resetAll?: boolean;
  selected?: () => void;
}

type StateValue = {
  counter: number;
  enabled: boolean;
};
export const Zoom: React.FC<ZoomProps> = ({
  resetAll,
  selected,
}) => {
  const setUserPreference = (value: number) => {
    localStorage.setItem('mw-accessibility---zoom-size', value.toString());
  };

  const getUserPreference = () => {
    const pref = localStorage.getItem('mw-accessibility---zoom-size');
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

  const bodyClassName = 'mw-zoom-size';
  const zoomSizeA = 'mw-size-a';
  const zoomSizeB = 'mw-size-b';
  const zoomSizeC = 'mw-size-c';

  useEffect(() => {
    if (state.enabled) {
      switch (state.counter) {
        case 1:
          applyStyle(state.counter);
          applyStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: zoomSizeA,
            addClassB: zoomSizeB,
            addClassC: zoomSizeC,
          });
          break;
        case 2:
          applyStyle(state.counter);
          applyStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: zoomSizeA,
            addClassB: zoomSizeB,
            addClassC: zoomSizeC,
          });
          break;
        case 3:
          applyStyle(state.counter);
          applyStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: zoomSizeA,
            addClassB: zoomSizeB,
            addClassC: zoomSizeC,
          });

          break;
        default:
          setUserPreference(0);
          removeStyles({
            counterValue: state.counter,
            bodyClass: bodyClassName,
            addClassA: zoomSizeA,
            addClassB: zoomSizeB,
            addClassC: zoomSizeC,
          });

          break;
      }
    } else {
      setUserPreference(0);
      removeStyles({
        counterValue: state.counter,
        bodyClass: bodyClassName,
        addClassA: zoomSizeA,
        addClassB: zoomSizeB,
        addClassC: zoomSizeC,
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
                width="36"
                height="36"
                viewBox="0 0 36 36"
                className="icon-text"
                role="presentation"
              >
                <path
                  id="zoom"
                  d="M39.8,41.95,26.65,28.8a11.018,11.018,0,0,1-3.5,2.025,12.374,12.374,0,0,1-4.25.725A12.449,12.449,0,0,1,9.75,27.8,12.332,12.332,0,0,1,6,18.75,12.332,12.332,0,0,1,9.75,9.7a12.391,12.391,0,0,1,9.1-3.75A12.25,12.25,0,0,1,27.875,9.7,12.374,12.374,0,0,1,31.6,18.75a12.472,12.472,0,0,1-.7,4.15,12.691,12.691,0,0,1-2.1,3.75L42,39.75ZM18.85,28.55a9.357,9.357,0,0,0,6.9-2.875A9.481,9.481,0,0,0,28.6,18.75a9.481,9.481,0,0,0-2.85-6.925,9.357,9.357,0,0,0-6.9-2.875,9.5,9.5,0,0,0-6.975,2.875A9.439,9.439,0,0,0,9,18.75a9.439,9.439,0,0,0,2.875,6.925A9.5,9.5,0,0,0,18.85,28.55ZM17.3,24.3V20.2H13.2v-3h4.1V13.15h3V17.2h4.05v3H20.3v4.1Z"
                  transform="translate(-6 -5.95)"
                  fill="currentColor"
                />
              </svg>
        </div>
        <p style={{ margin: 12 }}>Zoom</p>
      </div>
    </button>
  );
};
