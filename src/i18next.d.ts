import "i18next";
import enTranslations from "../src/locales/en";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof enTranslations;
    };
  }
}
