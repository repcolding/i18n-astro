export interface UI {
    [key: string]: {
        [key: string]: string
    }
}

export const useI18n = (ui: UI, defaultLang: string) => {
    const getLangFromUrl = (url: URL) => {
        const [_, lang] = url.pathname.split('/')

        if (lang in ui) {
            return lang as keyof typeof ui
        }

        return defaultLang
    }

    const useTranslations = (lang: keyof typeof ui) => {
        return function t(key: keyof (typeof ui)[typeof defaultLang]) {
            return ui[lang][key] || ui[defaultLang][key]
        }
    }

    return {
        getLangFromUrl,
        useTranslations
    }
}

export const useLocale = (locale: Record<string, string>) => {
    const upgrade = { ...locale }

    for (const key in locale) {
        if (locale[key] === '.') {
            locale[key] = key
        }
    }

    return upgrade
}
