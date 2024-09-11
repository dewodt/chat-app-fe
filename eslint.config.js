import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^\\$\\$(Props|Events|Slots|Generic)$'
				}
			],
			// Add this rule to allow 'any'
			'@typescript-eslint/no-explicit-any': 'off'
		}
	},
	{
		// Add a new configuration object for TypeScript files
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			// Turn off the 'no-explicit-any' rule for TypeScript files
			'@typescript-eslint/no-explicit-any': 'off'
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
];
