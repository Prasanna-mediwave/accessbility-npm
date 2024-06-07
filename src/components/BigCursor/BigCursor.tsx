import React, { useEffect } from "react";
import useCustomState from "../../hooks/useCustomState";
import "./cursor.css";

interface BigCursorProps {
  resetAll?: boolean;
  selected?: () => void;
}
export const BigCursor: React.FC<BigCursorProps> = ({
  resetAll,
  selected,
}) => {
  const setUserPreference = (value: number) => {
    localStorage.setItem('mw-accessibility---cursor', value.toString());
  };

  const getUserPreference = () => {
    const pref = localStorage.getItem('mw-accessibility---cursor');
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

  

  const bigCursor = ({ bodyClass }: { bodyClass: string }) => {
    document.body.classList.add(bodyClass);
  };
  
  const cursor = ({ bodyClass }: { bodyClass: string }) => {
    document.body.classList.remove(bodyClass);
  };

  const bodyClassName = 'big-cursor';

  useEffect(() => {
    if (state.counter) {
        bigCursor({
        bodyClass: bodyClassName,
      });
      setUserPreference(1);
    } else {
        cursor({
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
                width="25.042"
                height="35.549"
                viewBox="0 0 25.042 35.549"
                className="icon-text"
                role="presentation"
              >
                <path
                  id="Path_10954"
                  data-name="Path 10954"
                  d="M172.48,58.815l7.99-7.038,6.038,11.761a.02.02,0,0,0,.011.01.02.02,0,0,0,.015,0l6.642-3.41a.02.02,0,0,0,.01-.011.02.02,0,0,0,0-.015l-6.038-11.761,10.376-2.392L172.48,28Z"
                  transform="translate(-172.48 -28)"
                  fill="currentColor"
                />
              </svg>
        </div>
        <p style={{ margin: 12 }}>Large cursor</p>
      </div>
    </button>
  );
};
