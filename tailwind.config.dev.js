import defaultConfig from './tailwind.config.default';

/** @type {import('tailwindcss').Config} */
export default {
  ...defaultConfig,
  safelist: [
    {
      pattern: /.*/
    }
  ]
}

