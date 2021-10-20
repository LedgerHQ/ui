import { Theme } from "../../../styles/theme";

export function getLinkColors({ palette }: Theme["colors"]): {
  [index: string]: {
    [index: string]: {
      default: string;
      pressed: string;
    };
  };
} {
  return {
    default: {
      disabled: {
        default: palette.neutral.c50,
        pressed: palette.neutral.c50,
      },
      main: {
        default: palette.neutral.c100,
        pressed: palette.neutral.c80,
      },
      color: {
        default: palette.primary.c80,
        pressed: palette.primary.c70,
      },
      shade: {
        default: palette.neutral.c70,
        pressed: palette.neutral.c80,
      },
    },
    reversed: {
      disabled: {
        default: palette.neutral.c80,
        pressed: palette.neutral.c80,
      },
      main: {
        default: palette.neutral.c00,
        pressed: palette.neutral.c60,
      },
      color: {
        default: palette.primary.c60,
        pressed: palette.primary.c80,
      },
      shade: {
        default: palette.neutral.c50,
        pressed: palette.neutral.c00,
      },
    },
  };
}
