import { Engine } from './Engine'
import { globalThisPolyfill, isValidNumber } from '../shared'
import { reactive, Ref, ref } from 'vue'

export enum CursorStatus {
  Normal = 'NORMAL',
  DragStart = 'DRAG_START',
  Dragging = 'DRAGGING',
  DragStop = 'DRAG_STOP',
}

export enum CursorDragType {
  Move = 'MOVE',
  Resize = 'RESIZE',
  Rotate = 'ROTATE',
  Scale = 'SCALE',
  Translate = 'TRANSLATE',
  Round = 'ROUND',
}

export enum CursorType {
  Normal = 'NORMAL',
  Selection = 'SELECTION',
  Sketch = 'SKETCH',
}

export interface ICursorPosition {
  pageX?: number

  pageY?: number

  clientX?: number

  clientY?: number

  topPageX?: number

  topPageY?: number

  topClientX?: number

  topClientY?: number
}

export interface ICursor {
  status?: CursorStatus

  position?: ICursorPosition

  dragStartPosition?: ICursorPosition

  dragEndPosition?: ICursorPosition

  view?: Window
}

const DEFAULT_POSITION = {
  pageX: 0,
  pageY: 0,
  clientX: 0,
  clientY: 0,
  topPageX: 0,
  topPageY: 0,
  topClientX: 0,
  topClientY: 0,
}

const setCursorStyle = (contentWindow: Window, style: string) => {
  const currentRoot = document?.getElementsByTagName?.('html')?.[0]
  const root = contentWindow?.document?.getElementsByTagName('html')?.[0]
  if (root && root.style.cursor !== style) {
    root.style.cursor = style
  }
  if (currentRoot && currentRoot.style.cursor !== style) {
    currentRoot.style.cursor = style
  }
}

const calcPositionDelta = (
  end: ICursorPosition,
  start: ICursorPosition
): ICursorPosition => {
  return Object.keys(end || {}).reduce((buf, key) => {
    if (isValidNumber(end?.[key]) && isValidNumber(start?.[key])) {
      buf[key] = end[key] - start[key]
    } else {
      buf[key] = end[key]
    }
    return buf
  }, {})
}

export class Cursor {
  engine: Engine

  type: CursorType | string = CursorType.Normal

  dragType: CursorDragType | string = CursorDragType.Move

  status =  ref(CursorStatus.Normal) as Ref<CursorStatus>

  position =  ref(DEFAULT_POSITION) as Ref<ICursorPosition>

  dragStartPosition: ICursorPosition

  dragEndPosition: ICursorPosition

  dragAtomDelta: ICursorPosition = DEFAULT_POSITION

  dragStartToCurrentDelta: ICursorPosition = DEFAULT_POSITION

  dragStartToEndDelta: ICursorPosition = DEFAULT_POSITION

  view: Window = globalThisPolyfill

  constructor(engine: Engine) {
    this.engine = engine
  }

  get speed() {
    return Math.sqrt(
      Math.pow(this.dragAtomDelta.clientX, 2) +
        Math.pow(this.dragAtomDelta.clientY, 2)
    )
  }

  setStatus(status: CursorStatus) {
    this.status.value = status
  }

  setType(type: CursorType | string) {
    this.type = type
  }

  setDragType(type: CursorDragType | string) {
    this.dragType = type
  }

  setStyle(style: string) {
    this.engine.workbench.eachWorkspace((workspace) => {
      setCursorStyle(workspace.viewport.contentWindow, style)
    })
  }

  setPosition(position?: ICursorPosition) {
    this.dragAtomDelta = calcPositionDelta(this.position.value, position)
    const currentPosition:ICursorPosition = {};
    for (const key in DEFAULT_POSITION) {
      if (Object.prototype.hasOwnProperty.call(DEFAULT_POSITION, key)) {
        currentPosition[key] = position[key];
      }
    }
    this.position.value = currentPosition
    if (this.status.value === CursorStatus.Dragging) {
      this.dragStartToCurrentDelta = calcPositionDelta(
        this.position.value,
        this.dragStartPosition
      )
    }
  }

  setDragStartPosition(position?: ICursorPosition) {
    if (position) {
      this.dragStartPosition = { ...position, }
    } else {
      this.dragStartPosition = null
      this.dragStartToCurrentDelta = DEFAULT_POSITION
    }
  }

  setDragEndPosition(position?: ICursorPosition) {
    if (!this.dragStartPosition) return
    if (position) {
      this.dragEndPosition = { ...position, }
      this.dragStartToEndDelta = calcPositionDelta(
        this.dragStartPosition,
        this.dragEndPosition
      )
    } else {
      this.dragEndPosition = null
      this.dragStartToEndDelta = DEFAULT_POSITION
    }
  }
}
