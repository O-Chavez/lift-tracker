import { createGlobalStyle } from 'styled-components';

const GlobalStyle =  createGlobalStyle`
html, body, #root, .App {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}


canvas {
  height: 100%;
  display: flex;
}

h2 {
  font-weight: 600
}

h5 {
  font-weight: 500
}
`;

export default GlobalStyle;

