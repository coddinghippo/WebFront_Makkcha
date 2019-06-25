import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
${reset};
@import url("https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.min.css");

* {
    box-sizing: border-box;
}
html {
  font-size: 16px;
}

body{
  font-family: 'Nanum Gothic', sans-serif;
}

#root{
  width: 100%;
  height: 100%;
}

a{
  color: unset;
  &:hover{
    color: unset;
  }
}

strong{
  font-weight: 700;
}

button{
  cursor: pointer;
  background-color: white;
  outline: none;
  border: none;
  &:active {
    outline: none;
    border: none;
  }
}
`;
