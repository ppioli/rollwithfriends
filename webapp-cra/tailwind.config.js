module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#475569",
        dark: "#334155",
        darker: "#1e293b",
        darkest: "#0f172a",
        foreground: "#e2e8f0",
        primary: {
          DEFAULT: "#5b21b6",
          dark: "#4c1d95",
        },
        // ...
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
