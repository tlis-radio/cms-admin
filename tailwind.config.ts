import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xl-custom': '2196px', 
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-emerald-500',
    'bg-rose-500',
  ]
}
export default config
