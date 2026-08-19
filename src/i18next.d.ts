// src/i18next.d.ts

import "react-i18next";
import type enTranslations from "./i18n/locales/en";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof enTranslations;
    };
  }
}
