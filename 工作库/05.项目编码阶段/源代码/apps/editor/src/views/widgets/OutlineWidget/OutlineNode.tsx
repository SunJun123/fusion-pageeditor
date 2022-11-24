import {
  TreeNode,
  ClosestPosition,
  CursorStatus,
  DragMoveEvent,
} from "fusion-core";
import { isFn, useStyle } from "fusion-utils";
import {
  usePrefix,
  useCursor,
  useSelection,
  useMoveHelper,
  useContext,
  useDesigner,
  NodeTitleWidget,
  IconWidget,
} from "fusion-renderer";
import { NodeSymbol } from "./context";
import cls from "classnames";
import "./styles.less";
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  CSSProperties,
  watchEffect,
  watch,
  PropType,
} from "vue";

export interface IOutlineTreeNodeProps {
  node: TreeNode;
  style?: CSSProperties;
  className?: string;
  workspaceId?: string;
}

export const OutlineTreeNode = defineComponent({
  name: "OutlineTreeNode",
  inheritAttrs: false,
  props: {
    workspaceId: {
      type: String,
      default: ""
    },
    node: {
      type: Object as PropType<TreeNode>,
      required: true
    },
    className: {
      type: String
    }
  },
  setup(props) {
    const style = useStyle();
    const prefix = usePrefix("outline-tree-node");
    const engine = useDesigner();
    const refInstance = ref<HTMLDivElement>();
    const ctx = useContext(NodeSymbol);
    const cursor = useCursor();
    const selection = useSelection(props.workspaceId);
    const moveHelper = useMoveHelper(props.workspaceId);
    const request = ref<NodeJS.Timeout>();
    // [node, outlineDragon, cursor]
    let unSub: Array<() => void> = [];

    onMounted(() => {
      const ref = refInstance;
      const subcb = engine.value.subscribeTo(DragMoveEvent, () => {
        const closestNodeId = moveHelper.closestNode.value?.id;
        const closestDirection = moveHelper.closestDirection;
        const id = props.node.id;
        if (!ref.value) return;
        if (
          closestNodeId === id &&
          closestDirection === ClosestPosition.Inner
        ) {
          if (!ref.value.classList.contains("droppable")) {
            ref.value.classList.add("droppable");
          }
          if (!ref.value.classList.contains("expanded")) {
            if (request.value) {
              clearTimeout(request.value);
              request.value = undefined;
            }
            request.value = setTimeout(() => {
              ref.value?.classList.add("expanded");
            }, 600);
          }
        } else {
          if (request.value) {
            clearTimeout(request.value);
            request.value = undefined;
          }
          if (ref.value.classList.contains("droppable")) {
            ref.value.classList.remove("droppable");
          }
        }
      });
      unSub.push(subcb);
      watchEffect(() => {
        const selectedIds = selection.value?.selected || [];
        const id = props.node.id;
        if (!ref.value) return;
        if (selectedIds.value.includes(id)) {
          if (!ref.value.classList.contains("selected")) {
            ref.value.classList.add("selected");
          }
        } else {
          if (ref.value.classList.contains("selected")) {
            ref.value.classList.remove("selected");
          }
        }
        if (
          cursor.value.status.value === CursorStatus.Dragging &&
          moveHelper.dragNodes.value.length
        ) {
          if (ref.value.classList.contains("selected")) {
            ref.value.classList.remove("selected");
          }
        }
      });
    });

    onBeforeUnmount(() => {
      unSub.forEach((cb) => cb());
    });

    const renderIcon = (node: TreeNode) => {
      const icon = node.designerProps.icon;
      if (icon) {
        return <IconWidget infer={icon} size={"12px"} />;
      }
      if (node === node?.root) {
        return <IconWidget infer="Page" size={"12px"} />;
      } else if (node.designerProps?.droppable) {
        return <IconWidget infer="Container" size={"12px"} />;
      }
      return <IconWidget infer="Component" size={"12px"} />;
    };

    const renderActions = (node: TreeNode) => {
      if (isFn(ctx.value.renderActions)) return ctx.value.renderActions(node);
    };

    const renderTitle = (node: TreeNode) => {
      // TODO::判断renderTitle是不是VNode或者函数
      if (isFn(ctx.value.renderTitle)) return ctx.value.renderTitle(node);
      return (
        <span>
          <NodeTitleWidget node={node} />
        </span>
      );
    };

    return () => {
      const node = props.node as TreeNode;
      const ref = refInstance.value!;
      if (!node) return null;

      return (
        <div
          style={style}
          ref={refInstance}
          class={cls(prefix.value, props.className, "expanded")}
          data-designer-outline-node-id={node.id}
        >
          <div class={prefix.value + "-header"}>
            <div
              class={prefix.value + "-header-head"}
              style={{
                left: -node.depth * 16 + "px",
                width: node.depth * 16 + "px",
              }}
            ></div>
            <div class={prefix.value + "-header-content"}>
              <div class={prefix.value + "-header-base"}>
                {(node?.children.value.length > 0 || node === node.root) && (
                  <div
                    class={prefix.value + "-expand"}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (ref?.classList?.contains("expanded")) {
                        ref?.classList.remove("expanded");
                      } else {
                        ref?.classList.add("expanded");
                      }
                    }}
                  >
                    <IconWidget infer="Expand" size={10} />
                  </div>
                )}
                <div class={prefix.value + "-icon"}>{renderIcon(node)}</div>
                <div class={prefix.value + "-title"}>{renderTitle(node)}</div>
              </div>
              <div
                class={prefix.value + "-header-actions"}
                data-click-stop-propagation
              >
                {renderActions(node)}
                {node !== node.root && (
                  <IconWidget
                    key={node.hidden.value ? "EyeClose" : "Eye"}
                    class={cls(prefix.value + "-hidden-icon", {
                      hidden: node.hidden.value,
                    })}
                    infer={node.hidden.value ? "EyeClose" : "Eye"}
                    size={14}
                    onClick={() => {
                      console.log(node.id,!node.hidden.value)
                      node.hidden.value = !node.hidden.value;
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div class={prefix.value + "-children"}>
            {node.children.value.map((child: TreeNode) => {
              return (
                <OutlineTreeNode
                  node={child}
                  key={child.id}
                  workspaceId={props.workspaceId}
                />
              );
            })}
          </div>
        </div>
      );
    };
  },
});
