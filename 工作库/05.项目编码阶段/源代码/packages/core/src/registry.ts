import { reactive, ref } from "vue";
import { getBrowserLanguage, lowerSnake, mergeLocales } from "./internals";
import { Path } from 'fusion-path'
import { each } from 'fusion-utils'
import { IDesignerLanguageStore, IDesignerLocales } from "./types";

export type IDesignerIcons = Record<string, any>;
export interface IDesignerMiniLocales {
  [ISOCode: string]: string
}
const getISOCode = (language: string) => {
  let isoCode = DESIGNER_LANGUAGE_STORE
  let lang = lowerSnake(language)
  if (DESIGNER_LOCALES_STORE[lang]) {
    return lang
  }
  each(DESIGNER_LOCALES_STORE, (_, key: string) => {
    if (key.indexOf(lang) > -1 || String(lang).indexOf(key) > -1) {
      isoCode = key
      return false
    }
  })
  return isoCode
}
export type IDesignerIconsStore = IDesignerIcons;
const DESIGNER_ICONS_STORE: IDesignerIconsStore = {};
const DESIGNER_LOCALES_STORE = {}
let DESIGNER_LANGUAGE_STORE: IDesignerLanguageStore = getBrowserLanguage()
const DESIGNER_GLOBAL_REGISTRY = {
  setDesignerLanguage: (lang: string) => {
    DESIGNER_LANGUAGE_STORE = lang
  },
  getDesignerIcon: (name: string) => {
    return DESIGNER_ICONS_STORE[name];
  },
  registerDesignerIcons: (map: IDesignerIcons) => {
    Object.assign(DESIGNER_ICONS_STORE, map);
  },
  registerDesignerLocales: (...packages: IDesignerLocales[]) => {
    packages.forEach((locales) => {
      mergeLocales(DESIGNER_LOCALES_STORE, locales)
    })
  },
  getDesignerLanguage: () => {
    return getISOCode(DESIGNER_LANGUAGE_STORE)
  },
  getDesignerMessage: (token: string, locales?: IDesignerLocales) => {
    const lang = getISOCode(DESIGNER_LANGUAGE_STORE)
    const locale = locales ? locales[lang] : DESIGNER_LOCALES_STORE[lang]
    if (!locale) {
      for (let key in DESIGNER_LOCALES_STORE) {
        const message = Path.getIn(
          DESIGNER_LOCALES_STORE[key],
          lowerSnake(token)
        )
        if (message) return message
      }
      return
    }
    return Path.getIn(locale, lowerSnake(token))
  },
};

export type IDesignerRegistry = typeof DESIGNER_GLOBAL_REGISTRY;

export const GlobalRegistry: IDesignerRegistry = DESIGNER_GLOBAL_REGISTRY;
