import styled, { keyframes, css } from "styled-components";
import { ExplicitAny } from "../types/ExplicitAny";

export const shakeanimation = keyframes`
0% { transform: translateX(0) }
25% { transform: translateX(5px) }
50% { transform: translateX(-5px) }
75% { transform: translateX(5px) }
100% { transform: translateX(0) }
`;

export const verticleshake = keyframes`
0% { transform: translateY(0) }
25% { transform: translateY(2px) }
50% { transform: translateY(-2px) }
75% { transform: translateY(2px) }
100% { transform: translateY(0) }
`;

const verticleAnimationCss = css`
    animation: ${verticleshake} 0.3s linear 1.65;
`;

export const UseMaxText = styled.p<{
    swapTheme: ExplicitAny;
    showMaxAnimation: boolean;
}>`
    color: ${({ swapTheme }) => swapTheme.useMaxText};
    ${({ showMaxAnimation }) => (showMaxAnimation ? verticleAnimationCss : "")}
`;

const shakeAnimationCss = css`
    animation: ${shakeanimation} 0.3s linear 1.65;
`;

export const SwapText = styled.p<{
    swapTheme: ExplicitAny;
    showAnimation: boolean;
}>`
    color: ${({ swapTheme }) => swapTheme.primaryText};
    ${({ showAnimation }) => (showAnimation ? shakeAnimationCss : "")}
`;
