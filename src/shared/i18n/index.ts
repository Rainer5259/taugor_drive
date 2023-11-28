import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {pt_br} from './locales';

i18n
  .use(initReactI18next)

  .init({
    resources: {
      pt_br: {
        ...pt_br,
      },
    },
    compatibilityJSON: 'v3',
    lng: 'pt_br',
    fallbackLng: 'pt_br',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
