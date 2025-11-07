// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: 'all',
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    arrowParens: 'always',
    jsxSingleQuote: true,
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    importOrder: ['^~/(.*)$', '^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};

export default config;
