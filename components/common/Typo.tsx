import { HTMLAttributes } from "react";
import styled from "styled-components";
import { lightTheme } from "../ThemeClient";

type TypoSize = 14 | 16 | 20 | 30 | 36;
type TypoWeight = "bold" | "regular" | "semi-bold";
interface TypoProps extends HTMLAttributes<HTMLElement> {
  size?: TypoSize;
  weight?: TypoWeight;
  color?: string;
}

export default function Typo({ size = 16, weight = "regular", color = "black", ...props }: TypoProps) {
  return <TypoEl $size={size} $weight={weight} $color={color} {...props} />;
}

type TypoElProps = {
  $size: TypoSize;
  $weight: TypoWeight;
  $color: string;
};
const TypoEl = styled("div")<TypoElProps>`
  font-size: ${({ $size }) => $size}px;
  font-weight: ${({ $weight }) => {
    return {
      bold: 700,
      regular: 500,
      "semi-bold": 600,
    }[$weight];
  }};

  line-height: 130%;
  color: ${({ $color }) => lightTheme[$color as keyof typeof lightTheme] ?? $color};
`;
