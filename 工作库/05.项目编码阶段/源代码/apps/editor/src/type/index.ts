import { ComponentLevelEnum, ProjectTypeEnum } from "@/enum"

// 工程类型
export type TProjectType = ProjectTypeEnum.MOBILE | ProjectTypeEnum.PC | ProjectTypeEnum.BIG_SCREEN

// 组件所属级别
export type TComponentLevel= ComponentLevelEnum.INDUSTRY | ComponentLevelEnum.APPLICATION