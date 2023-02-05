type Classes = {
  default: string;
  replaceValue: string;
};
export const useAddClass = (
  el: React.MutableRefObject<HTMLElement | null>,
  classes: Classes
) => {
  function toggle() {
    const replaceValue = classes.replaceValue;
    const defaultValue = classes.default;
    el.current?.classList.add(replaceValue);
    el.current?.classList.remove(defaultValue);
    classes = { default: replaceValue, replaceValue: defaultValue };
  }
  return [toggle];
};
