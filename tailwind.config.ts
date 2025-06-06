import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { kodo } from './src/kodo'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			fontFamily: {
				modak: ['Modak', 'sans-serif'],
			},
		},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				custom: [
					kodo,
				],
			},
		}),
	],
} satisfies Config;
