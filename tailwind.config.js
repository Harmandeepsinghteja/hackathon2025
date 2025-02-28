// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       // backgroundImage: {
//       //   // "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//       //   // "gradient-conic":
//       //   //   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       // },
//     },
//   },
//   plugins: [],
// };
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}', // Make sure this is here to include components
    './src/app/**/*.{js,ts,jsx,tsx}', // For Next.js 13 app directory (if applicable)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
