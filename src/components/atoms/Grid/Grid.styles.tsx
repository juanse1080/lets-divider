import styled from "styled-components";

export type GridItemsAlignment =
  | "flex-start"
  | "center"
  | "flex-end"
  | "stretch"
  | "baseline";

export type GridContentAlignment =
  | "stretch"
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-around";

export type GridJustification =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type GridDirection = "row" | "row-reverse" | "column" | "column-reverse";

export type GridSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type GridWrap = "nowrap" | "wrap" | "wrap-reverse";

export type GridSize =
  | "auto"
  | boolean
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

export type GridRootProp = {
  container: boolean;
  item: boolean;
  direction: GridDirection;
  justify: GridJustification;
  spacing: GridSpacing;
  wrap: GridWrap;
  alignContent: GridContentAlignment;
  alignItems: GridItemsAlignment;
  lg: GridSize;
  md: GridSize;
  sm: GridSize;
  xl: GridSize;
  xs: GridSize;
};

const getOffset = (val: GridSpacing, div: number = 1) => {
  return `${(val * 8) / div}px`;
};

const generateGrid = (size: GridSize) => {
  let css = "";
  if (size === true) {
    css += `
      flex-basis: 0;
      flex-grow: 1;
      max-width: 100%;
    `;
  } else if (size === "auto") {
    css += `
      flex-basis: auto;
      flex-grow: 0;
      max-width: none;
    `;
  } else if (typeof size === "number") {
    css += `
    flex-basis: ${Math.round((size / 12) * 10e7) / 10e5}%;
    flex-grow: 0;
    max-width: ${Math.round((size / 12) * 10e7) / 10e5}%;
  `;
  }

  return css;
};

const GridRoot = styled.div<GridRootProp>`
  flex-wrap: ${({ wrap }) => wrap};
  flex-direction: ${({ direction }) => direction};
  align-items: ${({ alignItems }) => alignItems};
  align-content: ${({ alignContent }) => alignContent};
  justify-content: ${({ justify }) => justify};

  ${({ container }) =>
    container &&
    `
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
      `}

  ${({ item }) =>
    item &&
    `
      box-sizing: border-box;
      margin: 0;
      `}

  ${({ container, spacing }) =>
    container &&
    spacing !== 0 &&
    `
      // margin: -${getOffset(spacing, 2)};
      // width: calc(100% + ${getOffset(spacing)});
      & > * {
        padding: ${getOffset(spacing, 2)};
      }
        `}

  ${({ xs }) => xs !== false && generateGrid(xs)}

  ${({ theme, sm }) =>
    sm !== false &&
    `
    @media (min-width: ${theme.breakpoints.values.sm}px) {
      ${generateGrid(sm)}
    }
  `}

  ${({ theme, md }) =>
    md !== false &&
    `
    @media (min-width: ${theme.breakpoints.values.md}px) {
      ${generateGrid(md)}
    }
  `}

  ${({ theme, lg }) =>
    lg !== false &&
    `
    @media (min-width: ${theme.breakpoints.values.lg}px) {
      ${generateGrid(lg)}
    }
  `}

  ${({ theme, xl }) =>
    xl !== false &&
    `
    @media (min-width: ${theme.breakpoints.values.xl}px) {
      ${generateGrid(xl)}
    }
  `}
`;

export default GridRoot;
