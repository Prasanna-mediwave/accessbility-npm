/* this is common function for line height, letter spacing, zoom and font size in accessbility tool */ 
type values={
  counterValue: number;
  bodyClass: string;
  addClassA: string;
  addClassB: string;
  addClassC: string;
}

const applyStyles = ({
  counterValue,
  bodyClass,
  addClassA,
  addClassB,
  addClassC,
}: values) => {
  const classAPresent = document.body.classList.contains(addClassA);
  const classBPresent = document.body.classList.contains(addClassB);
  const classCPresent = document.body.classList.contains(addClassC);

  document.body.classList.add(bodyClass);
  if (counterValue === 1) {
    if (classBPresent) {
      document.body.classList.remove(addClassB);
    }
    if (classCPresent) {
      document.body.classList.remove(addClassC);
    }
    document.body.classList.add(addClassA);
  }
  if (counterValue === 2) {
    if (classAPresent) {
      document.body.classList.remove(addClassA);
    }
    if (classCPresent) {
      document.body.classList.remove(addClassC);
    }
    document.body.classList.add(addClassB);
  }
  if (counterValue === 3) {
    if (classAPresent) {
      document.body.classList.remove(addClassA);
    }
    if (classBPresent) {
      document.body.classList.remove(addClassB);
    }
    document.body.classList.add(addClassC);
  }
};

const removeStyles = ({
  counterValue,
  bodyClass,
  addClassA,
  addClassB,
  addClassC,
}: values) => {
  const classAPresent = document.body.classList.contains(addClassA);
  const classBPresent = document.body.classList.contains(addClassB);
  const classCPresent = document.body.classList.contains(addClassC);
  document.body.classList.remove(bodyClass);
  if (classAPresent) {
    document.body.classList.remove(addClassA);
  }
  if (classBPresent) {
    document.body.classList.remove(addClassB);
  }
  if (classCPresent) {
    document.body.classList.remove(addClassC);
  }
};

export { applyStyles, removeStyles };
