import { onBeforeUnmount } from 'vue'
import { Form } from 'fusion-form'
import { uid } from 'fusion-utils'
import { useForm } from './useForm'

export const useFormEffects = (effects?: (form: Form) => void): void => {
  const formRef = useForm()

  const id = uid()
  formRef.value.addEffects(id, effects)

  onBeforeUnmount(() => {
    formRef.value.removeEffects(id)
  })
}
