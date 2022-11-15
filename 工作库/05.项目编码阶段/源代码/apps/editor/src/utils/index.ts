import { isStr } from "fusion-core";
import { cloneVNode, CSSProperties, useAttrs } from "vue";

/**
 * 复制一个现有VNode对象
 * @param VNode
 * @param props
 * @returns
 */
export const cloneElement = cloneVNode;

const css2obj = (css: string) => {
  const r = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g,
    o = {};
  css.replace(r, (m, p, v) => (o[p] = v));
  return o;
};

export const useStyle = () => {
  let { style = {}, } = useAttrs();
  if (isStr(style)) {
    style = css2obj(style);
  }
  return style as CSSProperties;
};

export function composeExport<T0 extends {}, T1 extends {}>(
  s0: T0,
  s1: T1
): T0 & T1 {
  return Object.assign(s0, s1);
}
