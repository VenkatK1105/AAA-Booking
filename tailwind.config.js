/* eslint-disable no-unused-vars */
import defaultConfig from "./tailwind.config.default";

/** @type {import('tailwindcss').Config} */
export default {
  ...defaultConfig,
	corePlugins: {
		preflight: false,
	}
}