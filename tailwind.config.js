/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Habilita o modo escuro via classe CSS (.dark)
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
        // Fonte de destaque (headlines) incorporada da Brand
        display: ['Satoshi', 'General Sans', 'Ubuntu', 'sans-serif'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Nova cor primaria selecionada (Laranja) - mantendo para compatibilidade se necessário
        brand: {
          400: '#fb923c', // orange-400
          500: '#f97316', // orange-500
          600: '#ea580c', // orange-600
          // Tokens de estrutura incorporados da Brand, recoloridos com a identidade do portfólio (teal)
          black: '#050505',
          gray: '#111111',
          glow: '#38889F',
          orange: '#5FB4CC',
          amber: '#2B6D80',
          offwhite: '#F5F5F5',
        },
        // Cores do Gradiente para o Background da Foto
        'grad-red': '#511b15',
        'grad-brown': '#3c2918',
        'grad-purple': '#36296a',
        'grad-blue-jean': '#4961b1',
        'grad-blue-light': '#5d97bc',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
