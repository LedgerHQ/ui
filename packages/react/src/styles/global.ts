import { createGlobalStyle } from "styled-components";

import { rgba } from "./helpers";
import reset from "./reset";
import TextStyles from "@components/asorted/Text/styles";
import TippyStyles from "@components/message/Tooltip/styles";

export type GlobalStyleProps = { fontsPath: string };

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  ${reset};

  body {
    font-family: Inter;
    font-size: 100%;
  }

  ${TextStyles}

  .spectron-run canvas:not(.visible-for-spectron) {
    visibility: hidden;
  }

  #react-root {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    max-height: 100%;
    width: 100vw;
    height: 100vh;
    background-color: ${(p) => p.theme.colors.palette.neutral.c00};
  }

  ::selection {
    background: ${(p) => rgba(p.theme.colors.palette.primary.c100, 0.1)};
  }

  --track-color: rgba(0,0,0,0);

  ::-webkit-scrollbar              {
    width: ${(p) => p.theme.overflow.trackSize}px;
    height: ${(p) => p.theme.overflow.trackSize}px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-button       {
    opacity: 0;
    height: 0;
    width: 0;
  }
  ::-webkit-scrollbar-track        {
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb        {
    box-shadow: inset 0 0 0 ${(p) => p.theme.overflow.trackSize}px var(--track-color);
    border: 2px solid rgba(0,0,0,0);
    border-radius: ${(p) => p.theme.overflow.trackSize}px;
  }
  ::-webkit-scrollbar-corner {
    opacity: 0;
  }

<<<<<<< HEAD
  .tippy-box[data-animation=fade][data-state=hidden] {
    opacity: 0
  }

  [data-tippy-root] {
    max-width: calc(100vw - 10px)
  }

  .tippy-box {
    position: relative;
    background-color: ${(p) => p.theme.colors.palette.neutral.c100};
    color: ${(p) => p.theme.colors.palette.neutral.c00};
    border-radius: ${(p) => `${p.theme.radii[1]}px`};
    font-size: 14px;
    line-height: 1.4;
    outline: 0;
    transition-property: transform, visibility, opacity
  }

  .tippy-box[data-placement^=top]>.tippy-arrow {
    bottom: 0
  }

  .tippy-box[data-placement^=top]>.tippy-arrow:before {
    bottom: -4px;
    left: 0;
    border-width: 10px 10px 0;
    border-top-color: initial;
    transform-origin: center top
  }

  .tippy-box[data-placement^=bottom]>.tippy-arrow {
    top: 0
  }

  .tippy-box[data-placement^=bottom]>.tippy-arrow:before {
    top: -4px;
    left: 0;
    border-width: 0 10px 10px;
    border-bottom-color: initial;
    transform-origin: center bottom
  }

  .tippy-box[data-placement^=left]>.tippy-arrow {
    right: 0
  }

  .tippy-box[data-placement^=left]>.tippy-arrow:before {
    border-width: 10px 0 10px 10px;
    border-left-color: initial;
    right: -4px;
    transform-origin: center left
  }

  .tippy-box[data-placement^=right]>.tippy-arrow {
    left: 0
  }

  .tippy-box[data-placement^=right]>.tippy-arrow:before {
    left: -4px;
    border-width: 10px 10px 10px 0;
    border-right-color: initial;
    transform-origin: center right
  }

  .tippy-box[data-inertia][data-state=visible] {
    transition-timing-function: cubic-bezier(.54, 1.5, .38, 1.11)
  }

  .tippy-arrow {
    width: 16px;
    height: 16px;
    color: ${(p) => p.theme.colors.palette.neutral.c100};
  }

  .tippy-arrow:before {
    content: "";
    position: absolute;
    border-color: transparent;
    border-style: solid
  }

  .tippy-content {
    position: relative;
    padding: 8px 10px;
    z-index: 1
  }
=======
  ${TippyStyles}
>>>>>>> 16f5d20 (wip!)
`;
