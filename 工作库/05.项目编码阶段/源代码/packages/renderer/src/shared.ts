import { TreeNode, Engine } from 'fusion-core'

export type ComponentNameMatcher =
  | string
  | string[]
  | ((name: string, node: TreeNode, context?: any) => boolean)

export const matchComponent = (
  node: TreeNode,
  name: ComponentNameMatcher,
  context?: any
) => {
  if (name === '*') return true
  const componentName = node?.props?.['x-component']
  if (typeof name === 'function')
    return name(componentName || '', node, context)
  if (Array.isArray(name)) return name.includes(componentName)
  return componentName === name
}

export const matchChildComponent = (
  node: TreeNode,
  name: ComponentNameMatcher,
  context?: any
) => {
  if (name === '*') return true
  const componentName = node?.props?.['x-component']
  if (!componentName) return false
  if (typeof name === 'function')
    return name(componentName || '', node, context)
  if (Array.isArray(name)) return name.includes(componentName)
  return componentName.indexOf(`${name}.`) > -1
}

export const includesComponent = (
  node: TreeNode,
  names: ComponentNameMatcher[],
  target?: TreeNode
) => {
  return names.some((name) => matchComponent(node, name, target))
}

export const queryNodesByComponentPath = (
  node: TreeNode,
  path: ComponentNameMatcher[]
): TreeNode[] => {
  if (path?.length === 0) return []
  if (path?.length === 1) {
    if (matchComponent(node, path[0])) {
      return [node]
    }
  }
  const result = matchComponent(node, path[0])
    ? node.children.reduce((buf, child) => {
      return buf.concat(queryNodesByComponentPath(child, path.slice(1)))
    }, [])
    : []
  return result
}

export const findNodeByComponentPath = (
  node: TreeNode,
  path: ComponentNameMatcher[]
): TreeNode | undefined => {
  if (path?.length === 0) return
  if (path?.length === 1) {
    if (matchComponent(node, path[0])) {
      return node
    }
  }
  if (matchComponent(node, path[0])) {
    for (let i = 0; i < node.children.length; i++) {
      const next = findNodeByComponentPath(node.children[i], path.slice(1))
      if (next) {
        return next
      }
    }
  }
}

export const hasNodeByComponentPath = (
  node: TreeNode,
  path: ComponentNameMatcher[]
) => !!findNodeByComponentPath(node, path)

export const matchArrayItemsNode = (node: TreeNode) => {
  return (
    node?.parent?.props?.type === 'array' &&
    node?.parent?.children?.[0] === node
  )
}

export const createNodeId = (designer: Engine, id: string) => {
  return {
    [designer.props.nodeIdAttrName!]: id,
  }
}
