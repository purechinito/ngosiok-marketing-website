/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFEAE6",
          100: "#FFD6CD",
          200: "#FFAA99",
          300: "#FF7E66",
          400: "#EB4D33",
          500: "#7e0f00",
          600: "#6B0D00",
          700: "#580B00",
          800: "#450800",
          900: "#320600",
          DEFAULT: "#7e0f00",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          50: "#E6F0FA",
          100: "#CCE1F5",
          200: "#99C3EB",
          300: "#66A5E0",
          400: "#3387D6",
          500: "#0054A5",
          600: "#004387",
          700: "#003269",
          800: "#00224B",
          900: "#00112D",
          DEFAULT: "#0054A5",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          50: "#FDF9EC",
          100: "#FBF3D9",
          200: "#F7E7B3",
          300: "#F3DB8D",
          400: "#EFCF67",
          500: "#E3B631",
          600: "#D4A117",
          700: "#A17D12",
          800: "#6E540C",
          900: "#3B2C06",
          DEFAULT: "#E3B631",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
