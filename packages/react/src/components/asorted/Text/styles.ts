import { GlobalStyleProps } from "../../../styles/global";
import { css } from "styled-components";

const getFontSource = (name: string) => (props: GlobalStyleProps) => {
  const fontsPath = props.fontsPath || "assets/fonts";
  return `url("${fontsPath}/${name}.woff2") format("woff2")`;
};

export const fontStyles = css`
  @font-face {
    font-family: "Inter";
    src: ${getFontSource("Inter-ExtraLight-BETA")};
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: ${getFontSource("Inter-Light-BETA")};
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: ${getFontSource("Inter-Regular")};
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: ${getFontSource("Inter-Medium")};
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: ${getFontSource("Inter-SemiBold")};
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: ${getFontSource("Inter-ExtraBold")};
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: "Alpha";
    src: ${getFontSource("HMAlphaMono-Medium")};
    font-weight: 500;
    font-style: normal;
  }
`;
