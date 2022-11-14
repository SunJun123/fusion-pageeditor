import { createForm } from 'fusion-form'
import { markRaw } from 'vue'

const createRawForm = (...args: Parameters<typeof createForm>) => {
  const form = createForm(...args)
  return markRaw(form)
}

export { createRawForm as createForm }
