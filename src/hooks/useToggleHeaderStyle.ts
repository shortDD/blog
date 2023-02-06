import { useEffect, useRef } from "react";
type Record = {
  scrollTop: number;
  direction?: string;
};
type ToggleStyle = {
  down: string;
  up: string;
  //视口宽度小于该值 不执行操作
  media?: number;
};
export const useToggleHeaderStyle = (
  els: React.MutableRefObject<HTMLDivElement | null>[],
  styles: ToggleStyle[]
) => {
  //记录上次滚动条位置
  const record = useRef<Record>({ scrollTop: 0 });
  useEffect(() => {
    function throttle(fn: Function, delay: number) {
      let time = 0;
      return function handle(this: unknown) {
        if (Date.now() - time > delay) {
          fn.apply(this, arguments);
          time = Date.now();
        }
      };
    }
    function getScrollTop() {
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      return scrollTop;
    }
    //滚动对比方向一致不操作
    function contrast(): boolean {
      const oldDir = record.current.direction;
      const oldScrollTop = record.current.scrollTop;
      const newScrollTop = getScrollTop();
      const newDir = newScrollTop > oldScrollTop ? "down" : "up";
      record.current = { direction: newDir, scrollTop: newScrollTop };
      //没有方向值，判断为初始阶段
      // if (typeof oldDir === "undefined") return false;
      //记录本次状态
      return newDir === oldDir ? false : true;
    }
    function demo() {
      const flag = contrast();
      if (flag) {
        const dir = record.current.direction as string;
        els.forEach((el, index) => {
          if (styles[index].media && window.innerWidth <= styles[index].media!)
            return;
          el.current?.classList.add(
            dir === "down" ? styles[index]["down"] : styles[index]["up"]
          );
          el.current?.classList.remove(
            dir === "down" ? styles[index]["up"] : styles[index]["down"]
          );
        });
      }
    }
    const toggleHeaderStyle = throttle(demo, 100);
    window.addEventListener("scroll", toggleHeaderStyle);
    return () => {
      window.removeEventListener("scroll", toggleHeaderStyle);
    };
  }, [els, styles]);
};
