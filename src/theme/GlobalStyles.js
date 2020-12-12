import { createGlobalStyle } from 'styled-components';

const GlobalStyle =  createGlobalStyle`
html, body, #root{
  // max-height: 100%;
  // overflow: hidden;
  // height: 100%;

}
@media screen and (max-width: 600px) {
  .table {
    font-size: .8em;
  }
  // .jumbotron {
  //   margin: 0;
  // }
}

 .App {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 55px auto 100px;
    min-height: 100vh;
}

.MainContent {
  grid-row-start: 2;
  margin-top: 1em;
}

.page {
  position: absolute;

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
  width: 100%;
}
.fade-appear-active,
.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms linear 150ms;

}

.fade-exit {
  opacity: 1;
  position: absolute;
  width: 100%
}
.fade-exit.fade-exit-active {
  opacity: 0;
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

