/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "stamplr-blue": "#4e9eff",
        "stamplr-gray": "#374151",
        surface: "#18181c",
        "surface-dark": "#0f0f11",
        border: "#2a2a30",
        muted: "#6b6b7a",
        accent: "#4e9eff",
        accent2: "#a78bfa",
      },
      fontFamily: {
        mono: ["'Share Tech Mono'", "monospace"],
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(135deg, #0a0a0e 0%, #0f0f18 50%, #111122 100%)",
        "gradient-accent": "linear-gradient(135deg, #4e9eff 0%, #a78bfa 100%)",
        "gradient-glow": "radial-gradient(ellipse at 50% 0%, rgba(78, 158, 255, 0.1) 0%, transparent 50%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(78, 158, 255, 0.4)",
        "glow-purple": "0 0 40px -10px rgba(167, 139, 250, 0.4)",
      },
    },
  },
  plugins: [],
};
