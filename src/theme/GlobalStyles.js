import { createGlobalStyle } from 'styled-components';

const GlobalStyle =  createGlobalStyle`
html, body, #root, .App {
  position: relative;
  height: 100%;
  // width: 100%
  // margin: 0;
  display: flex;
  flex-direction: column;
}

.page {
  // height: 100%;
  position: absolute;
  // top: 65px;
  left: 0;
  right: 0
  // display: flex;
  // flex-direction: column;
}

// .collapsed {
//   // display: none;
//   overflow: hidden;
//   tranisition: max-height 3.9s ease;
// }

.fade-appear,
.fade-enter {
  position: absolute;
  opacity: 0;
  z-indez: 10;
  width: 100%;
}
.fade-appear-active,
.fade-enter.fade-enter-active {
  opacity: 1;
  // position: absolute;
  transition: opacity 300ms linear 150ms;

}

.fade-exit {
  opacity: 1;
  position: absolute;
  width: 100%
}
.fade-exit.fade-exit-active {
  opacity: 0;
  // position: absolute;
  transition: opacity 150ms linear;
}

canvas {
  height: 100%;
  display: flex;
}

body {
  background-color: #f7f7f7
}

h2 {
  font-weight: 600
}

h5 {
  font-weight: 500
}
`;

export default GlobalStyle;

