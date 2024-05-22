import React, { useEffect } from "react";
import useCustomState from "../../hooks/useCustomState/useCustomState";
import "./highlightLink.css";

interface HighlightLinkProps {
  resetAll?: boolean;
  selected?: () => void;
  backgroundColor:string
  textColor:string
}
export const HighlightLink: React.FC<HighlightLinkProps> = ({
  resetAll,
  selected,backgroundColor,textColor
}) => {
  const setUserPreference = (value: number) => {
    localStorage.setItem("mw-accessibility---highlight", value.toString());
  };

  const getUserPreference = () => {
    const pref = localStorage.getItem("mw-accessibility---highlight");
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

  

  const highLightLink = ({ bodyClass }: { bodyClass: string }) => {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.classList.add(bodyClass);
      link.style.backgroundColor = backgroundColor ; 
      link.style.color=textColor
    });
  };
  
  const unHighLightLink = ({ bodyClass }: { bodyClass: string }) => {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.classList.remove(bodyClass);
      link.style.backgroundColor = "";
      link.style.color=""
    });
  };

  const bodyClassName = "mw-highlight";

  useEffect(() => {
    if (state.counter) {
      highLightLink({
        bodyClass: bodyClassName,
      });
      setUserPreference(1);
    } else {
      unHighLightLink({
        bodyClass: bodyClassName,
      });
      setUserPreference(0);
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
    if (state.counter === 0) {
      setState({
        counter: 1,
        enabled: false,
      });
    } else {
      setState({
        counter: 0,
        enabled: true,
      });
    }
  };
  return (
    <button type="button" onClick={handleClick}>
      <div>
        <div style={{ display: "flex", justifyContent: "center", margin: 8 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="44"
            viewBox="0 0 40 44"
            className="icon-text"
            role="presentation"
          >
            <path
              id="highlight-link"
              d="M6.85,36.65l6-6-.2-.2a3.679,3.679,0,0,1-1.075-2.775A3.848,3.848,0,0,1,12.7,24.9L32.75,4.85a3.144,3.144,0,0,1,4.3,0l5.6,5.6a3,3,0,0,1,.825,2.275A3.158,3.158,0,0,1,42.6,15L22.55,35.05a3.548,3.548,0,0,1-2.625.95,3.548,3.548,0,0,1-2.625-.95l-.55-.55L14.6,36.65ZM28.7,18.9Zm2.85,2.9L25.8,16.05,14.15,27.7l5.75,5.75ZM4,48V41.95H44V48Z"
              transform="translate(-4 -4)"
              fill="currentColor"
            />
          </svg>
        </div>
        <p style={{ margin: 12 }}>Highlight link</p>
      </div>
    </button>
  );
};
