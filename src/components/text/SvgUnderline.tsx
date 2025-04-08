import * as React from "react";
import Svg, { SvgProps, Path, Circle } from "react-native-svg";

export interface SvgUnderlineProps extends SvgProps {
  width?: number | string;
  strokeWidth?: number;
}

export const SvgUnderline: React.FC<SvgUnderlineProps> = ({
  width = 80,
  color = "#000",
  strokeWidth = 1.5,
  ...otherProps
}) => (
  <Svg width={width} height={"25"} fill="none" {...otherProps}>
    <Path
      strokeWidth={strokeWidth}
      stroke={color}
      d={`M0 -.5h245.411`}
      transform="matrix(-.99859 -.05312 .06993 -.99755 246 22)"
    />
    <Path
      strokeWidth={strokeWidth}
      stroke={color}
      d="M0 -.5h41.656"
      transform="matrix(-.9431 -.33253 .42138 -.90689 40.22 15.481)"
    />

    <Circle cx={2.338} cy={2.338} r={2.338} fill={color} />
    <Circle cx={2.339} cy={2.403} r={1.403} fill="#fff" />

    <Circle cx={2.338} cy={9.338} r={2.338} fill={color} />
    <Circle cx={2.339} cy={9.403} r={1.403} fill="#fff" />
  </Svg>
);
