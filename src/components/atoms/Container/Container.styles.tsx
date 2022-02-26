import styled from "styled-components";

const Container = styled.div<{
  maxWidth: "xs" | "sm" | "md" | "lg" | "xl";
  fixed?: boolean;
}>`
  width: 100%;
  box-sizing: border-box;
  padding-right: 8px;
  padding-left: 8px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.values["sm"]}px) {
    padding-right: 12px;
    padding-left: 12px;
  }

  ${({ theme, maxWidth }) =>
    maxWidth === "xs"
      ? `
      @media (min-width: ${theme.breakpoints.values[maxWidth]}px) {
        max-width: ${Math.max(theme.breakpoints.values[maxWidth], 444)}px;
      }
    `
      : `
      @media (min-width: ${theme.breakpoints.values[maxWidth]}px) {
        max-width: ${theme.breakpoints.values[maxWidth]}px;
      }
    `}

  ${({ theme, fixed }) =>
    fixed
      ? theme.breakpoints.keys.reduce((acc: any, key: string) => {
          const value = theme.breakpoints.values[key];

          if (value !== 0) {
            return (
              acc +
              `
                @media (min-width: ${theme.breakpoints.values[key]}px) {
                  max-width: ${theme.breakpoints.values[key]}px;
                }\n\n
              `
            );
          }
          return "";
        }, "")
      : ""}
`;

export default Container;
