export const SIDE_BAR_MINI_WIDTH = 48;
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 80;

// 标签页样式
export enum TabsThemeEnum {

  // 圆滑
  SMOOTH = 'smooth',

  // 卡片
  CARD = 'card',

  // 极简
  SIMPLE = 'simple',
}

export enum ContentEnum {

  // auto width
  FULL = 'full',

  // fixed width
  FIXED = 'fixed',
}

// menu theme enum
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum SettingButtonPositionEnum {
  AUTO = 'auto',
  HEADER = 'header',
  FIXED = 'fixed',
}

export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE,
}

/**
 * 权限模式
 */
export enum PermissionModeEnum {

  // role
  ROLE = 'ROLE',

  // 后台
  BACK = 'BACK',

  // route mapping
  ROUTE_MAPPING = 'ROUTE_MAPPING',
}

//  Route switching animation
export enum RouterTransitionEnum {
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
  FADE_SIDE = 'fade-slide',
  FADE = 'fade',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale',
}

export enum Environment {
  BUILD_ENV = 'BuildEnv', //打包环境
  RUN_ENV = 'RunEnv', //运行环境
}

export enum BuildEnv {
  EDITOR = 'development', //编辑环境
  PREVIEW = 'preview', //预览环境
  RELEASED = 'released', //发布后
}

export enum RunEnv {
  SIMU = 'simu', //模拟环境
  TEST = 'test', //测试环境
  PRO = 'pro', //正式环境
}
