/* eslint-env node */
module.exports = {
    root: true,
    ignorePatterns: ['**/node_modules/*', 'demo/public/*',],
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: [
            'error',
            4,
            {
                ignoredNodes: ['TemplateLiteral > *'],
            },
        ],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'none',
                ignoreRestSiblings: true,
            },
        ],
    },
};
