/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                btn: {
                    background: "hsl(var(--btn-background))",
                    "background-hover": "hsl(var(--btn-background-hover))",
                },
                palette: {
                    green: "#0D9276",
                    beige: "#FFF6E9",
                    blue: "#40A2E3",
                    sky: "#BBE2EC",
                },
            },
            fontFamily: {
                Raleway: ["Raleway", "sans-serif"],
            },
        },
    },
    plugins: [],
};
