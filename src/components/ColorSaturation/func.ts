const applyColorSaturation = ({
    saturationValue,
    elements,
  }: {
    saturationValue: string; // 'saturate(0.5)',
    elements: HTMLElement[];
  }) => {
    elements.forEach((e) => {
      e.style.filter = saturationValue;
    });
  };
  
  const removeColorSaturation = ({ elements }: { elements: HTMLElement[] }) => {
    elements.forEach((e) => {
      e.style.removeProperty('filter');
    });
  };
  
  export { applyColorSaturation, removeColorSaturation };
  