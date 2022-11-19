import { computed } from 'vue'
import { useSelection } from './useSelection'

export const useSelected = (workspaceId?: string) => {
  const selection = useSelection(workspaceId)
  return computed(() => {
    return selection.value.selected
  })
}
