import { Engine, isFn } from 'fusion-core'
import { DesignerEngineSymbol } from '../context'
import { inject, onBeforeUnmount, ref, Ref } from 'vue'
export interface IEffects {
    (engine: Engine): void
}

export const useDesigner = (effects?: IEffects): Ref<Engine> => {
    const designer = inject(DesignerEngineSymbol)

    let unRef: any = isFn(effects) ? effects(designer.value) : undefined

    onBeforeUnmount(() => {
        unRef?.()
    })
    return designer
}
