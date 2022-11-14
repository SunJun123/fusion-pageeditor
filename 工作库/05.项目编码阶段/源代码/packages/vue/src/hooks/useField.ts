import { inject, Ref, ref } from 'vue'
import { GeneralField } from 'fusion-form'
import { FieldSymbol } from '../shared/context'

export const useField = <T = GeneralField>(): Ref<T> => {
  return inject(FieldSymbol, ref()) as any
}
