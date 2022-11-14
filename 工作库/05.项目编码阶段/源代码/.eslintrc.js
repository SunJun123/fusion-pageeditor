const { defineConfig, } = require("eslint-define-config");

module.exports = defineConfig({
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
		commonjs: true,
		amd: true,

		// The Follow config only works with eslint-plugin-vue v8.0.0+
		"vue/setup-compiler-macros": true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		sourceType: "module",
		ecmaVersion: "latest",
	},
	plugins: ["vue", "@typescript-eslint"],
	extends: [
		"eslint:recommended",
		"plugin:vue/vue3-recommended"
	],
	overrides: [
		{
			files: ["*.vue"],
			parser: "vue-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
				sourceType: "module",
				ecmaVersion: "latest",
			},
			rules: {
				"vue/multi-word-component-names": "off",
			},
		},
		{
			files: ["*.ts"],
			rules: {
				"no-undef": "off",
				"no-dupe-class-members": "off",
				"no-unused-vars": "off",
				"no-empty": "off",
				"getter-return": "off",
				"no-redeclare": "off",
				"no-constant-condition": "off",
				"no-useless-escape": "off",
				"no-prototype-builtins": "off",
			},
		}
	],
	rules: {
		// indent: [
		//   2,2, // 缩进两个
		//   {
		// 	SwitchCase: 1, // switch case缩进缩进2格（2x1）
		// 	VariableDeclarator: 'first' // const let var 对齐缩进
		//   }
		// ],
		// quotes: [2, 'single'], // 强制使用单引号
		// eqeqeq: 2, // 强制使用===,!==
		camelcase: [
			2,
			{
				// 强制驼峰命名
				properties: "never", // 忽略属性名
				allow: ["^\\$_"], // 忽略匹配值
			}
		],
		"consistent-this": [2, "_this"], // 强制使用_this为this别名
		// /**
		//  * 注释
		//  */
		"lines-around-comment": [
			2,
			{
				beforeBlockComment: true, // 块注释之前空行
				beforeLineComment: true, // 行注释之前空行
				allowBlockStart: true, // 允许注释出现在块语句的开始位置
				allowObjectStart: true, // 允许注释出现在对象字面量的开始位置
				allowArrayStart: true, // 允许注释出现在数组字面量的开始位置
				allowClassStart: true, // 允许注释出现在类的开始位置
				ignorePattern: "#",
			}
		],
		"vue/html-self-closing": [2, {
			"html": {
				"void": "never",
				"normal": "never",
				"component": "never",
			},
			"svg": "always",
			"math": "always",
		}],//标签自闭合
		/**
		 * 空格
		 */
		"no-multi-spaces": 2, // 禁止连续空格
		"no-trailing-spaces": 2, // 禁止行尾空格
		"no-whitespace-before-property": 2, // 禁止点调用有空格 a. b => a.b
		"computed-property-spacing": 2, // 计算属性[]内禁止空格 obj[ i] => obj[i]
		"key-spacing": 2, // 对象键值之间空格
		"keyword-spacing": 2, // 关键字前后空格
		"space-in-parens": [2, "never"], // 强制小括号()前后不允许空格
		"space-infix-ops": 2, // 强制操作符之间有空格
		// 'space-unary-ops': [2, {
		//   words: true, // 单词类一元操作符之间空格，例：typeof
		//   nonwords: false // 符号类不空格，例：++ --
		// }],
		"operator-assignment": 2, // 简化赋值操作
		// 'operator-linebreak': [2, 'before'],
		// /**
		//  * 空行
		//  */
		"no-multiple-empty-lines": [
			2,
			{
				max: 1, // 连续最大空行数
				maxEOF: 0, // 文件末尾空行数
			}
		],

		/**
		 * 标点符号风格
		 */
		"comma-style": 2, // 强制逗号放在末尾处
		// 'comma-spacing': 2, // 强制逗号后有至少一个空格
		"comma-dangle": [
			"error",
			{
				arrays: "never",
				objects: "always",
			}
		], // 强制不使用末尾逗号
		"semi-style": ["error", "last"], // 强制分号在末尾处
		// 'semi-spacing': [2, { before: false, after: true }], // 强制分号后又至少一个空格
		// /**
		//  * 代码块
		//  */
		"block-spacing": [2, "always"], // 代码块空格{return} => { return }
		// 'brace-style': [2, '1tbs', { allowSingleLine: true }], // 代码块{}换行
		// 'space-before-blocks': 2, // 强制代码块之前有空格
		// /**
		//  * object
		//  */
		"object-curly-newline": [2, { multiline: true, consistent: true, }], // 大括号换行
		'object-property-newline': [2, { allowAllPropertiesOnSameLine: true, }], // 属性换行，允许全在同一行
		// 'object-curly-spacing': [2, 'always'], // 强制{}括号前后不空格
		// 'quote-props': [2, 'as-needed'], // 属性统强制使用引号
		// /**
		//  * array
		//  */
		// 'array-bracket-spacing': 2, // 强制数组[]括号前后不空格
		// 'array-bracket-newline': [2, 'consistent'], // []括号换行
		// 'array-element-newline': [2, 'consistent'], // []元素换行
		// /**
		//  * function
		//  */
		// 'func-call-spacing': 2, // 方法调用时，方法名与()不允许空格 func () => func()
		// 'arrow-spacing': 2, // 要求箭头函数的箭头部分前后的空格
		// 'space-before-function-paren': [2, {
		//   anonymous: 'never',
		//   named: 'never',
		//   asyncArrow: 'always'
		// }], // function方法名和括号之前的空格
		// /**
		//  * switch
		//  */
		'switch-colon-spacing': 2, // switch case冒号前后空格
		// /**
		//  * eslint-plugin-vue
		//  * ====================================================================================================
		//  */
		/**
		 * .vue
		 */
		"vue/block-tag-newline": [
			2,
			{
				singleline: "always",
				multiline: "always",
				maxEmptyLines: 1,
			}
		], // template,script,style标签的结束标签强制换行，允许在一行
		"vue/multi-word-component-names": [
			"error",
			{
				ignores: ["index"], //需要忽略的组件名
			}
		],

		/**
		 * template
		 */
		"vue/no-v-html": 0, // 允许v-html
		// 'vue/singleline-html-element-content-newline': 0, // 单行元素内容前后的换行符
		"vue/max-attributes-per-line": [2,
			{
				"singleline": 5,
				"multiline": {
					"max": 5,
				},
			}
		],

		// /**
		//  * script
		//  */
		// // 不要求props的type和default
		// 'vue/require-prop-types': 0,
		// 'vue/require-default-prop': 0
	},
});
