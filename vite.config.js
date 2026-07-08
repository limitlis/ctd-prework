import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite-plus'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const isDev = mode === 'development';
    return {
        fmt: {
            semi: false,
            singleQuote: true,
        },
        base: isDev ? '/' : '/ctd-prework/',
        lint: {
            plugins: ['eslint', 'unicorn', 'oxc', 'vue'],
            categories: {
                correctness: 'error',
            },
            env: {
                browser: true,
                builtin: true,
            },
            ignorePatterns: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
            rules: {
                'no-case-declarations': 'error',
                'no-empty': 'error',
                'no-fallthrough': 'error',
                'no-prototype-builtins': 'error',
                'no-redeclare': 'error',
                'no-regex-spaces': 'error',
                'no-undef': 'error',
                'no-unexpected-multiline': 'error',
                'no-useless-assignment': 'error',
                'preserve-caught-error': 'error',
                'vite-plus/prefer-vite-plus-imports': 'error',
            },
            options: {
                typeAware: true,
                typeCheck: true,
            },
            jsPlugins: [
                {
                    name: 'vite-plus',
                    specifier: 'vite-plus/oxlint-plugin',
                },
            ],
        },
        plugins: [vue(), vueDevTools(), tailwindcss()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            port: 5155,
        },
    }
})
