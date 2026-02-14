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
      backgroundImage: {
        "gradient-dark": "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
        "gradient-accent": "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
        "gradient-glow": "radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(59, 130, 246, 0.4)",
        "glow-purple": "0 0 40px -10px rgba(139, 92, 246, 0.4)",
      },
    },
  },
  plugins: [],
};
