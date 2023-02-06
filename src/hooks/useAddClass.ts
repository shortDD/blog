type Classes = {
  default: string;
  replaceValue: string;
};
export const useAddClass = (
  el: React.MutableRefObject<HTMLElement | null>,
  classes: Classes
) => {
  function toggle() {
    if (!el.current) return;
    const replaceValue = classes.replaceValue;
    const defaultValue = classes.default;
    replaceValue.trim() && el.current?.classList.add(replaceValue);
    defaultValue.trim() && el.current?.classList.remove(defaultValue);
    classes = { default: replaceValue, replaceValue: defaultValue };
  }
  return [toggle];
};
