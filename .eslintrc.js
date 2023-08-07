module.exports = {
    extends: ['next/core-web-vitals', 'alloy', 'alloy/react', 'alloy/typescript'],
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    globals: {
        // 你的全局变量（设置为 false 表示它不允许被重新赋值）
        //
        // myGlobal: false
    },
    rules: {
        // 关闭document不能加载css
        '@next/next/no-css-tags': 'off',
        'no-new-native-nonconstructor': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        // 关闭禁止直接使用类型断言
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        'no-param-reassign': 'off',
        // 是否自动闭合单标签
        // 'react/self-closing-comp': 'off',
        // 根据箭头函数的复杂度决定是否省略大括号和 return 语句，例如 (x) => x * 2 可以省略，但 (x) => { return x * x; } 不可以省略。
        'arrow-body-style': ['warn', 'as-needed'],
    },
}
