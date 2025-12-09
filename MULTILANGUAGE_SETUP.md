# Multi-Language Support

## Overview
KrishiMitra now supports 6 languages with English as the default.

## Supported Languages
1. **English** (en) - Default
2. **Hindi** (hi) - हिन्दी
3. **Bengali** (bn) - বাংলা
4. **Marathi** (mr) - मराठी
5. **Telugu** (te) - తెలుగు
6. **Tamil** (ta) - தமிழ்

## Implementation

### Files Created
1. **src/utils/i18n.js** - Translation strings for all languages
2. **src/context/LanguageContext.js** - Language state management

### Files Updated
1. **App.js** - Wrapped with LanguageProvider
2. **FarmerInputScreen.js** - All text translated
3. **SettingsScreen.js** - Language selector added

## How to Use

### Change Language
1. Go to Settings screen
2. Tap on "Language" option
3. Select your preferred language from the list
4. App will update immediately

### For Developers

#### Using translations in components:
```javascript
import { useLanguage } from '../context/LanguageContext';

function MyComponent() {
  const { t } = useLanguage();
  
  return <Text>{t('dashboard')}</Text>;
}
```

#### Adding new translations:
Edit `src/utils/i18n.js` and add the key to all language objects:
```javascript
export const translations = {
  en: { myKey: 'My Text' },
  hi: { myKey: 'मेरा पाठ' },
  // ... add to all languages
};
```

## Translated Screens
- ✅ Navigation tabs
- ✅ Farmer Input screen (complete)
- ✅ Settings screen (partial)
- ⏳ Dashboard (to be added)
- ⏳ History (to be added)
- ⏳ AI Insights (to be added)
- ⏳ Forecast (to be added)

## Next Steps
To complete full app translation:
1. Add more translation keys to i18n.js
2. Update remaining screens with useLanguage hook
3. Translate all static text, buttons, and labels
4. Test all languages thoroughly

## Language Persistence
Currently, language selection resets on app restart. To persist:
1. Install AsyncStorage: `expo install @react-native-async-storage/async-storage`
2. Save language preference in LanguageContext
3. Load saved language on app start
