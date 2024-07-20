/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxHeight: {
        custom: "600px", // Adjust this value as needed
      },
      colors: {
        "custom-blue": "#020E3B",
      },
      boxShadow: {
        "custom-glow": "0 0 50px 15px #392959",
        "custom-glow-link": "0 0 30px 8px #392959",
      },
    },
  },
  variants: {},
  plugins: [],
};
