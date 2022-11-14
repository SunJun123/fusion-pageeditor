import { isObjectField, GeneralField, Form, ObjectField } from 'fusion-form'
import { computed, Ref } from 'vue'
import { useField } from './useField'
import { useForm } from './useForm'

export const useParentForm = (): Ref<Form | ObjectField> => {
  const field = useField()
  const form = useForm()
  const findObjectParent = (field: GeneralField) => {
    if (!field) return form.value
    if (isObjectField(field)) return field
    return findObjectParent(field?.parent)
  }
  return computed(() => findObjectParent(field.value))
}
