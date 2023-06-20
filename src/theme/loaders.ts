import styled, { keyframes } from "styled-components";

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotationBackAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

export const DefaultLoader = styled.div<{ swapTheme: any }>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 10px solid;
  border-color: ${({ swapTheme }) => swapTheme.swapButton} ${({ swapTheme }) => swapTheme.swapButton} transparent;
  box-sizing: border-box;
  animation: ${rotationAnimation} 1.5s linear infinite;

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 10px solid;
    border-color: transparent ${({ swapTheme }) => swapTheme.accentText} ${({ swapTheme }) => swapTheme.accentText};
    width: 75px;
    height: 75px;
    border-radius: 50%;
    animation: ${rotationBackAnimation} 0.7s linear infinite;
    transform-origin: center center;
  }
}
`;

const GridCircleKey = keyframes`
0%,
10% {transform: translate(0) rotate(0)}
35% {transform: translate(calc(var(--s,1)*50%)) rotate(0)}
66% {transform: translate(calc(var(--s,1)*50%)) rotate(calc(var(--s,1)*180deg))}
90%,
100% {transform: translate(0) rotate(calc(var(--s,1)*180deg))}
`

export const GridCircleLoader = styled.div<{ swapTheme: any }>`
width: 100px;
height: 100px;
display: grid;

&:before,
&::after {
    content: "";
    grid-area: 1/1;
    border-radius: 50%;
    background: ${({ swapTheme }) => swapTheme.swapButton};
    -webkit-mask:repeating-linear-gradient(#000 0 5px,#0000 0 10px);
    animation: ${GridCircleKey} 1.5s infinite;
}

&:after {
    -webkit-mask:repeating-linear-gradient(#0000 0 5px,#000 0 10px);
    --s:-1;
}
`

const NinjaLoaderKey = keyframes`
33%  {inset:-10px;transform: rotate(0deg)}
66%  {inset:-10px;transform: rotate(90deg)}
100% {inset:0    ;transform: rotate(90deg)}
`

export const NinjaLoader = styled.div<{ swapTheme: any }>`
width: 100px;
height: 100px;
color: ${({ swapTheme }) => swapTheme.swapButton};
position: relative;
background: radial-gradient(35px,currentColor 94%,#0000);

&:before {
    content:'';
    position: absolute;
    inset:0;
    border-radius: 50%;
    background:
      radial-gradient(9px at bottom right,#0000 94%,currentColor) top    left,
      radial-gradient(9px at bottom left ,#0000 94%,currentColor) top    right,
      radial-gradient(9px at top right,#0000 94%,currentColor) bottom left,
      radial-gradient(9px at top left ,#0000 94%,currentColor) bottom right;
    background-size:50px 50px;
    background-repeat: no-repeat;
    animation: ${NinjaLoaderKey} 1.5s infinite cubic-bezier(0.3,1,0,1);
}
`