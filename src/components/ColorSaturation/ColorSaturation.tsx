import React, { useEffect, useRef } from "react";
import useCustomState from "../../hooks/useCustomState/useCustomState";
import { applyColorSaturation, removeColorSaturation } from "./func";

interface ColorSaturationProps {
  resetAll?:boolean
  selected?:()=>void
}
type StateValue = {
  counter: number;
  enabled: boolean;
};
export const ColorSaturation: React.FC<ColorSaturationProps> = ({resetAll,selected}) => {
  const setUserPreference = (value: number) => {
    localStorage.setItem(
      "mw-accessibility---color-saturation",
      value.toString()
    );
  };

  const getUserPreference = () => {
    const pref = localStorage.getItem("mw-accessibility---color-saturation");
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

  const findTags = useRef<HTMLElement[]>([
    ...document.querySelectorAll("html"),
  ]);

  const applyStyle = (index: number) => {
    let arrIndex = index - 1; 

    if (arrIndex < 0) {
      arrIndex = 0;
    }

    setUserPreference(index);
    return;
  };

  useEffect(() => {
    if (state.enabled) {
      switch (state.counter) {
        case 1:
          applyStyle(state.counter);
          applyColorSaturation({
            saturationValue: "saturate(0.5)",
            elements: findTags.current,
          });
          break;
        case 2:
          applyStyle(state.counter);
          applyColorSaturation({
            saturationValue: "saturate(3)",
            elements: findTags.current,
          });
          break;
        case 3:
          applyStyle(state.counter);
          applyColorSaturation({
            saturationValue: "saturate(0)",
            elements: findTags.current,
          });
          break;
        default:
          setUserPreference(0);
          removeColorSaturation({
            elements: findTags.current,
          });
          break;
      }
    } else {
      setUserPreference(0);
      removeColorSaturation({
        elements: findTags.current,
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
   if(selected !== undefined && selected !== null){
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
        <div style={{display:"flex",justifyContent:"center", margin:8}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon-text"
            width="41"
            height="41"
            viewBox="0 0 41 41"
            role="presentation"
          >
            <path
              id="Union_tolltip1"
              data-name="Union 1"
              d="M12.52,39.389A20.558,20.558,0,1,1,20.5,41,20.429,20.429,0,0,1,12.52,39.389ZM8.125,8.125A17.5,17.5,0,0,0,20.5,38V3A17.387,17.387,0,0,0,8.125,8.125Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <p style={{margin:12}}>Colour saturation</p>
      </div>
    </button>
  );
};
