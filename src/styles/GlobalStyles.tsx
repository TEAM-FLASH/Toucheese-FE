/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from './Variables';
import { TypoBodyMdR } from './Common';
import { breakPoints } from './BreakPoint';

const GlobalStyles = css`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    src: url('@/assets/fonts/PretendardVariable.woff2') format('woff2');
    font-display: swap;
  }

  :root {
    font-size: 10px; /* 1rem = 10px */
    min-width: 320px;
    min-height: 100svh;
    background: ${variables.colors.white};

    --breakPointPC: 500px;

    --layoutPadding: 1.6rem;
    --headerHeight: 5.6rem;
    --maxWidth: 100%;

    @media (min-width: ${breakPoints.pc}) {
      --layoutPadding: 2.4rem;
      --headerHeight: 8rem;
      --maxWidth: 1280px;

      overflow-x: clip;
      max-width: calc(var(--maxWidth) + calc(var(--layoutPadding) * 2));
      max-width: var(--maxWidth);
      margin: 0 auto;
    }
  }

  body {
    margin: unset;
    color: ${variables.colors.black};
    font-family: 'Pretendard', sans-serif; /* Pretendard 폰트 적용 */
    font-size: ${variables.size.medium};
    padding: 0 ${variables.layoutPadding} calc(4rem + ${variables.headerHeight});

    @media (min-width: ${breakPoints.pc}) {
      padding-bottom: 0;
    }
  }

  html,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: unset;
    padding: unset;
    border: 0;
    font-family: 'Pretendard', sans-serif; /* Pretendard 폰트 적용 */
    font-size: inherit;
    font-weight: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    letter-spacing: -0.02em;
    line-height: 1.4;
    word-break: keep-all;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul,
  li {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
  }

  strong {
    font-weight: bold;
  }

  button {
    all: unset;
    cursor: pointer;
  }

  img {
    max-width: 100%;
    vertical-align: top;
  }

  label {
    cursor: pointer;
  }

  /* input, select, textarea style */
  select {
    color: inherit;
    appearance: none;
    padding-right: 3.2rem;
  }

  textarea {
    all: unset;
  }

  select,
  input,
  textarea {
    font-family: 'Pretendard', sans-serif; /* Pretendard 폰트 적용 */
    letter-spacing: -0.02em;
    box-sizing: border-box;
  }

  textarea {
    width: 100%;
    font-size: ${variables.size.medium};
    box-sizing: border-box;
    overflow-y: auto;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    padding: unset;
  }

  input[type='text'],
  input[type='search'] {
    height: 4rem;
    width: 100%;
    font-size: ${variables.size.medium};
    text-indent: 0.7em;
    border-radius: ${variables.borderRadius};
    border: 1px solid ${variables.colors.gray400};
    outline: 1px solid transparent;
  }

  input[type='text']::placeholder,
  input[type='email']::placeholder,
  input[type='password']::placeholder,
  input[type='tel']::placeholder {
    color: ${variables.colors.gray500};
    font-family: unset;
  }

  input:focus,
  input[type='email']:focus,
  input[type='password']:focus,
  input[type='tel']:focus {
  }

  select:focus-visible {
    border-color: ${variables.colors.primary};
    outline: 1px solid ${variables.colors.primary};
  }

  input[type='checkbox'],
  input[type='radio'] {
    all: unset;
    box-sizing: border-box;
    display: inline-block;
    min-width: 1.4rem;
    cursor: pointer;
    position: relative;
    vertical-align: middle;
    margin-top: -0.2em;
    margin-right: 0.7em;
    aspect-ratio: 1 / 1;
  }

  input[type='radio'] {
    width: 1.3em;
    border: 2px solid ${variables.colors.gray500};
    border-radius: 50%;

    &:checked {
      border-width: 0.4em;
      border-color: ${variables.colors.primary600};
    }
  }

  input[type='checkbox'] {
    width: 1.4em;
    border: 2px solid ${variables.colors.gray600};
    border-radius: 2px;

    &:checked {
      color: ${variables.colors.primary600};
      border-color: currentColor;
      background: currentColor url(/img/icon-check-white-radius.svg) no-repeat center / 0.8em;
    }
  }

  textarea {
    position: relative;
    border: 1px solid ${variables.colors.gray400};
    border-radius: 0.6rem;
    padding: 1rem 1.2rem 2.6rem;
    min-height: 7.6rem;
    ${TypoBodyMdR}
  }

  .mo {
    display: block;
  }
  .pc {
    display: none;
  }

  @media (max-width: 350px) {
    :root {
      font-size: 9px;
    }
  }

  @media (min-width: 500px) and (max-width: 767px) {
    :root {
      font-size: 11px;
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    :root {
      font-size: 12px;
    }
  }

  @media (max-width: ${breakPoints.moMax}) {
    :root {
      width: 100%;
      overflow-x: clip;
    }
  }

  /* PC */
  @media (min-width: ${breakPoints.pc}) {
    .mo {
      display: none;
    }
    .pc {
      display: block;
    }
  }

  @media (min-width: ${breakPoints.pc}) and (max-width: 1439px) {
    :root {
      font-size: 9px;
    }
  }
`;

export default GlobalStyles;
