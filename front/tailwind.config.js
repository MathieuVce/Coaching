module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  media: false,
  theme: {
      colors: {
          transparent: 'transparent',
          current: 'currentColor',
          white: {
              DEFAULT: '#ffffff',
              light: '#F5F5F5'
          },
          blue: {
            DEFAULT: '#0AC5CD',
            light: '#97AEAF'
          },
          brown: {
            DEFAULT: '#7C7C7C'
          },
          green: {
              light: '#6fcf97',
              DEFAULT: '#27AE60',
              dark: '#219653',
              darker: '#1e874b',
          },
          red: {
              light: '#FFEAEA',
              DEFAULT: '#EB5757',
              dark: '#C20D0D',
          },
          orange: {
              light: '#FFEBDA',
              DEFAULT: '#F66A0A',
              dark: '#A04100',
          },
          primary: {
              DEFAULT: '#24292E',
          },
          warning: {
              DEFAULT: '#D1711C',
          }
      },
      extend: {
            boxShadow: {
              default: '0px 10px 20px rgba(150, 150, 187, 0.1)',
            },
            fontSize: {
              '2rem': '2rem',
            },
        },
      },
      variants: {
          extend: {},
      },
      plugins: [],
  };