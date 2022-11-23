import { Operation } from './Operation'
import { TreeNode } from './TreeNode'
import { HoverNodeEvent } from '../events'
import { shallowRef, ShallowRef } from 'vue'

export interface IHoverProps {
  operation: Operation
}

export class Hover {
  node = shallowRef(null) as ShallowRef<TreeNode>
  operation: Operation
  constructor(props?: IHoverProps) {
    this.operation = props?.operation
  }

  setHover(node?: TreeNode) {
    if (node) {
      this.node.value = node
    } else {
      this.node.value = null
    }
    this.trigger()
  }

  clear() {
    this.node.value = null
  }

  trigger() {
    if (this.operation) {
      return this.operation.dispatch(
        new HoverNodeEvent({
          target: this.operation.tree,
          source: this.node.value,
        })
      )
    }
  }

}
