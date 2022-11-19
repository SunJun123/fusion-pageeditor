import { useOperation } from './useOperation'
import { computed } from 'vue'

export const useSelection = (workspaceId?: string) => {
  const operation = useOperation(workspaceId)
  return computed(() => operation.value?.selection)
}
