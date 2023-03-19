export function debounce(fn: Function, delay: number) {
  let timer: any = null;

  return (...args: any) => {
    // @ts-ignore
    let _this = this;

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(_this, args);
    }, delay);
  };
}
