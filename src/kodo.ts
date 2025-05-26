
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const kodo: CustomThemeConfig = {
	name: 'kodo',
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `"Jura Variable", system-ui`,
		"--theme-font-family-heading": `"Jura Variable", system-ui`,
		"--theme-font-color-base": "var(--color-secondary-500)",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "16px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "var(--color-surface-500)",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "var(--color-secondary-500)",
		// =~= Theme Colors  =~=
		// primary | #a8bf54 
		"--color-primary-50": "242 245 229", // #f2f5e5
		"--color-primary-100": "238 242 221", // #eef2dd
		"--color-primary-200": "233 239 212", // #e9efd4
		"--color-primary-300": "220 229 187", // #dce5bb
		"--color-primary-400": "194 210 135", // #c2d287
		"--color-primary-500": "168 191 84", // #a8bf54
		"--color-primary-600": "151 172 76", // #97ac4c
		"--color-primary-700": "126 143 63", // #7e8f3f
		"--color-primary-800": "101 115 50", // #657332
		"--color-primary-900": "82 94 41", // #525e29
		// secondary | #4c5621 
		"--color-secondary-50": "228 230 222", // #e4e6de
		"--color-secondary-100": "219 221 211", // #dbddd3
		"--color-secondary-200": "210 213 200", // #d2d5c8
		"--color-secondary-300": "183 187 166", // #b7bba6
		"--color-secondary-400": "130 137 100", // #828964
		"--color-secondary-500": "76 86 33", // #4c5621
		"--color-secondary-600": "68 77 30", // #444d1e
		"--color-secondary-700": "57 65 25", // #394119
		"--color-secondary-800": "46 52 20", // #2e3414
		"--color-secondary-900": "37 42 16", // #252a10
		// tertiary | #1d1d1d 
		"--color-tertiary-50": "221 221 221", // #dddddd
		"--color-tertiary-100": "210 210 210", // #d2d2d2
		"--color-tertiary-200": "199 199 199", // #c7c7c7
		"--color-tertiary-300": "165 165 165", // #a5a5a5
		"--color-tertiary-400": "97 97 97", // #616161
		"--color-tertiary-500": "29 29 29", // #1d1d1d
		"--color-tertiary-600": "26 26 26", // #1a1a1a
		"--color-tertiary-700": "22 22 22", // #161616
		"--color-tertiary-800": "17 17 17", // #111111
		"--color-tertiary-900": "14 14 14", // #0e0e0e
		// success | #26d3ab 
		"--color-success-50": "222 248 242", // #def8f2
		"--color-success-100": "212 246 238", // #d4f6ee
		"--color-success-200": "201 244 234", // #c9f4ea
		"--color-success-300": "168 237 221", // #a8eddd
		"--color-success-400": "103 224 196", // #67e0c4
		"--color-success-500": "38 211 171", // #26d3ab
		"--color-success-600": "34 190 154", // #22be9a
		"--color-success-700": "29 158 128", // #1d9e80
		"--color-success-800": "23 127 103", // #177f67
		"--color-success-900": "19 103 84", // #136754
		// warning | #ebebeb 
		"--color-warning-50": "252 252 252", // #fcfcfc
		"--color-warning-100": "251 251 251", // #fbfbfb
		"--color-warning-200": "250 250 250", // #fafafa
		"--color-warning-300": "247 247 247", // #f7f7f7
		"--color-warning-400": "241 241 241", // #f1f1f1
		"--color-warning-500": "235 235 235", // #ebebeb
		"--color-warning-600": "212 212 212", // #d4d4d4
		"--color-warning-700": "176 176 176", // #b0b0b0
		"--color-warning-800": "141 141 141", // #8d8d8d
		"--color-warning-900": "115 115 115", // #737373
		// error | #f93b3b 
		"--color-error-50": "254 226 226", // #fee2e2
		"--color-error-100": "254 216 216", // #fed8d8
		"--color-error-200": "254 206 206", // #fecece
		"--color-error-300": "253 177 177", // #fdb1b1
		"--color-error-400": "251 118 118", // #fb7676
		"--color-error-500": "249 59 59", // #f93b3b
		"--color-error-600": "224 53 53", // #e03535
		"--color-error-700": "187 44 44", // #bb2c2c
		"--color-error-800": "149 35 35", // #952323
		"--color-error-900": "122 29 29", // #7a1d1d
		// surface | #ffffff 
		"--color-surface-50": "255 255 255", // #ffffff
		"--color-surface-100": "255 255 255", // #ffffff
		"--color-surface-200": "255 255 255", // #ffffff
		"--color-surface-300": "255 255 255", // #ffffff
		"--color-surface-400": "255 255 255", // #ffffff
		"--color-surface-500": "255 255 255", // #ffffff
		"--color-surface-600": "230 230 230", // #e6e6e6
		"--color-surface-700": "191 191 191", // #bfbfbf
		"--color-surface-800": "153 153 153", // #999999
		"--color-surface-900": "125 125 125", // #7d7d7d

	}
}