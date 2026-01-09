/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                background: '#F3F4F6',
                surface: '#FFFFFF',
                text: { main: '#111827', secondary: '#6B7280', placeholder: '#9CA3AF' },
                primary: { DEFAULT: '#4F46E5', active: '#4338CA', light: '#E0E7FF', text: '#3730A3' },
                kin: { DEFAULT: '#F59E0B', dark: '#D97706', light: '#FFFBEB' },
                success: { DEFAULT: '#10B981', bg: '#D1FAE5', text: '#065F46' },
                error: { DEFAULT: '#EF4444', bg: '#FEE2E2', text: '#991B1B' },
            },
        },
    },
    plugins: [],
}