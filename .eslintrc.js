module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 4],
        curly: ['error', 'multi-or-nest', 'consistent'],
        'space-before-function-paren': 0,
        'object-curly-spacing': 0,
        'comma-dangle': 'off',
        "react/no-unescaped-entities": 0,
        // 'no-unused-vars': 0,
    }
}
