import React, { useEffect, useState } from "react";
import { RulerAction } from "./RulerAction";
import './ruler.css'

interface RulerProps {
  resetAll?: any;
  selected?: any;
}
type StateValue = {
  cursorPosition: { x: number; y: number };
};

export const Ruler: React.FC<RulerProps> = ({ resetAll, selected }) => {
  const [rulerValue, SetRulerCount] = useState<number>();
  const [state, setState] = useState({
    cursorPosition: { x: 0, y: 0 },
  });

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      setState((prevState: StateValue) => ({
        ...prevState,
        cursorPosition: { x: event.clientX, y: event.clientY },
      }));
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {}, [rulerValue]);

  const handleRullerChange = (counter: number) => {
    SetRulerCount(counter);
  };

  const upperMaskHeight = state.cursorPosition.y;

  return (
    <>
      {rulerValue === 1 && (
        <div className="mw-addruler" style={{ top: `${upperMaskHeight}px` }} />
      )}
      <RulerAction
        resetAll={resetAll}
        onCounterChange={handleRullerChange}
        selected={selected}
      />
    </>
  );
};
