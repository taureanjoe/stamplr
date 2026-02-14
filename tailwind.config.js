/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "stamplr-blue": "#1e3a5f",
        "stamplr-gray": "#374151",
      },
    },
  },
  plugins: [],
};
