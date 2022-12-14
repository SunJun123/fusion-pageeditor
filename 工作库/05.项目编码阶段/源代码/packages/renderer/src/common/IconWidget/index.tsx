import { isStr, isFn, isObj, isPlainObj,cloneElement, useStyle } from "fusion-utils";
import { ElTooltip, ElTooltipProps } from "element-plus";
import { usePrefix, useRegistry, useTheme } from "../../hooks";
import "./styles.less";
import {
  computed,
  defineComponent,
  InjectionKey,
  onMounted,
  provide,
  Ref,
  ref,
  unref,
  VNode,
  isVNode,
} from "vue";
import cls from "classnames";
import { useContext } from "../../context";

const IconSymbol: InjectionKey<Ref<IconProviderProps>> = Symbol();

const isNumSize = (val: any) => /^[\d.]+$/.test(val);
export interface IconProviderProps {
  tooltip?: boolean;
}

export interface IShadowSVGProps {
  content?: string;
  width?: number | string;
  height?: number | string;
}
export interface IIconWidgetProps extends HTMLElement {
  tooltip?: ElTooltipProps;
  infer: VNode | { shadow: string };
  size?: number | string;
}
export const IconWidget = defineComponent({
  name: "IconWidget",
  inheritAttrs: false,
  props: ["tooltip","infer","size"],
  emits: ["click"],
  setup(props, { attrs, emit }) {
    const themeRef = useTheme();
    const IconContextRef: Ref<IconProviderProps> = useContext(IconSymbol);
    const registry = useRegistry();
    const prefixRef = usePrefix("icon");
    return () => {
      const size = isNumSize(props.size)
        ? `${props.size}px`
        : props.size || "1em";

      const style = useStyle();
      const height = style?.height || size;
      const width = style?.width || size;

      const takeIcon: any = (infer: any) => {
        if (isStr(infer)) {
          const finded = registry.getDesignerIcon(infer);
          if (finded) {
            return takeIcon(finded);
          }
          return <img src={infer} height={height} width={width} />;
        } else if (isFn(infer)) {
          return (
            <infer
              {...{ height: height, width: width, fill: "currentColor" }}
              fill="currentColor"
            ></infer>
          );
        } else if (isVNode(infer)) {
          if (infer.type === "svg") {
            const Component = cloneElement(infer, {
              height,
              width,
              fill: "currentColor",
              viewBox: infer.props?.viewBox || "0 0 1024 1024",
              focusable: "false",
              "aria-hidden": "true",
            });
            return Component;
          } else if (infer.type === "path" || infer.type === "g") {
            return (
              <svg
                viewBox="0 0 1024 1024"
                height={height}
                width={width}
                fill="currentColor"
                focusable="false"
                aria-hidden="true"
              >
                {infer}
              </svg>
            );
          }
          return infer;
        } else if (isPlainObj(infer)) {
          const theme = unref(themeRef);
          if (infer[theme]) {
            return takeIcon(infer[theme]);
          } else if (infer["shadow"]) {
            return (
              <IconWidgetShadowSVG
                width={width}
                height={height}
                content={infer["shadow"]}
              />
            );
          }
        }
        return null;
      };

      const renderTooltips = (children: any) => {
        const IconContext = unref(IconContextRef);
        if (!isStr(props.infer) && IconContext?.tooltip) return children;
        const tooltip =
          props.tooltip || registry.getDesignerMessage(`icons.${props.infer}`);
        if (tooltip) {
          const props = isObj(tooltip) ? tooltip : { content: tooltip };
          const { content, ..._props } = props as any;
          return (
            <ElTooltip
              showAfter={200}
              {..._props}
              v-slots={{ content: () => content }}
            >
              {children}
            </ElTooltip>
          );
        }
        return children;
      };

      return renderTooltips(
        <span
          {...attrs}
          class={cls(prefixRef.value)}
          style={{
            cursor: attrs.onClick ? "pointer" : style?.cursor,
          }}
          onClick={() => emit("click")}
        >
          {takeIcon(props.infer)}
        </span>
      );
    };
  },
});

export const IconWidgetShadowSVG = defineComponent({
  props: {
    width: [Number, String],
    height: [Number, String],
    content: String,
  },
  setup(props) {
    const refInstance = ref<HTMLDivElement>();
    const width = isNumSize(props.width) ? `${props.width}px` : props.width;
    const height = isNumSize(props.height) ? `${props.height}px` : props.height;

    onMounted(() => {
      if (refInstance.value) {
        const root = refInstance.value.attachShadow({
          mode: "open",
        });
        root.innerHTML = `<svg viewBox="0 0 1024 1024" style="width:${width};height:${height}">${props.content}</svg>`;
      }
    });

    return () => <div ref={refInstance}></div>;
  },
});

export const IconWidgetProvider = defineComponent({
  inheritAttrs: false,
  props: { tooltip: Boolean },
  setup(props, { slots }) {
    provide(
      IconSymbol,
      computed(() => props)
    );
    return () => slots.default?.();
  },
});
