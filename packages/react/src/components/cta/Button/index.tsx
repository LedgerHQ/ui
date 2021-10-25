import React, { useState } from "react";
import styled, { css } from "styled-components";
import { fontSize, color } from "styled-system";
import fontFamily from "../../../styles/styled/fontFamily";
import { fontSizes } from "../../../styles/theme";
import ChevronBottom from "../../../assets/icons/ChevronBottomRegular";

type ButtonTypes = "main" | "shade" | "error" | "color";

interface BaseProps {
  ff?: string;
  color?: string;
  fontSize?: number;
  type?: ButtonTypes;
  outline?: boolean;
  iconPosition?: "right" | "left";
  iconButton?: boolean;
  disabled?: boolean;
}

export interface ButtonProps<I = any> extends BaseProps {
  Icon?: React.ComponentType<I>;
  children?: React.ReactNode;
  onClick: (event?: React.SyntheticEvent<HTMLButtonElement>) => void;
  iconSize?: number;
}
const IconContainer = styled.div<{
  iconPosition: "right" | "left";
}>`
  display: inline-block;
  margin-${(p) => (p.iconPosition === "left" ? "right" : "left")}: ${(p) => p.theme.space[4]}px;
  padding-top: 0.2em;
`;

export const Base = styled.button.attrs((p: BaseProps) => ({
  ff: "Inter|SemiBold",
  color: p.color ?? "palette.neutral.c100",
  fontSize: p.fontSize ?? 4,
}))<BaseProps>`
  ${fontFamily};
  ${fontSize};
  ${color};
  border-radius: ${(p) => p.theme.space[13]}px;
  height: ${(p) => p.theme.space[13]}px;
  line-height: ${(p) => p.theme.fontSizes[p.fontSize]}px;
  border-style: solid;
  border-width: ${(p) => (p.outline || p.type === "shade" ? 1 : 0)}px;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 2em;
  background-color: transparent;
  border-color: transparent;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  position: relative;
  cursor: ${(p) => (p.disabled ? "default" : "pointer")};
  &:focus {
    outline: 4px solid ${(p) => p.theme.colors.palette.primary.c50};
  }

  ${(p) => {
    if (p.disabled) {
      return p.outline || p.type === "shade"
        ? `
          border-color: ${p.theme.colors.palette.neutral.c50};
          color: ${p.theme.colors.palette.neutral.c50};
          background-color: ${p.theme.colors.palette.neutral.c00};          
        `
        : `
          color: ${p.theme.colors.palette.neutral.c50};
          background-color: ${p.theme.colors.palette.neutral.c30};
        `;
    }

    const type: ButtonTypes | "default" = p.type ?? ("default" as ButtonTypes | "default");
    switch (type) {
      case "shade":
        return `
          border-color: ${p.theme.colors.palette.neutral.c40};
          color: ${p.theme.colors.palette.neutral.c100};
          background-color: ${p.theme.colors.palette.neutral.c00};
          &:focus {
            border-color: ${p.theme.colors.palette.primary.c80};
          }

          &:hover {
            background-color: ${p.theme.colors.palette.neutral.c20};
          }
        `;

      case "error":
        return p.outline
          ? `
          border-color: ${p.theme.colors.palette.error.c100};
          color: ${p.theme.colors.palette.error.c100};
          background-color: ${p.theme.colors.palette.neutral.c00};
          &:hover {
            background-color: ${p.theme.colors.palette.error.c10};
          }
        `
          : `
          color: ${p.theme.colors.palette.neutral.c00};
          background-color: ${p.theme.colors.palette.error.c100};
          &:hover {
            background-color: ${p.theme.colors.palette.error.c80};
          }
        `;

      case "color":
        return p.outline
          ? `
        border-color: ${p.theme.colors.palette.primary.c80};
        color: ${p.theme.colors.palette.primary.c80};
        background-color: ${p.theme.colors.palette.neutral.c00};
        &:hover {
          background-color: ${p.theme.colors.palette.primary.c10};
        }
      `
          : `
        color: ${p.theme.colors.palette.neutral.c00};
        background-color: ${p.theme.colors.palette.primary.c80};
        &:hover {
          background-color: ${p.theme.colors.palette.primary.c70};
        }
      `;

      case "main":
        return p.outline
          ? `
          border-color: ${p.theme.colors.palette.neutral.c100};
          color: ${p.theme.colors.palette.neutral.c100};
          background-color: ${p.theme.colors.palette.neutral.c00};          
          &:hover {
            background-color: ${p.theme.colors.palette.neutral.c20};
          }
        `
          : `
          color: ${p.theme.colors.palette.neutral.c00};
          background-color: ${p.theme.colors.palette.neutral.c100};
          &:hover {
            background-color: ${p.theme.colors.palette.neutral.c90};
          }
        `;
      case "default":
      default:
        return p.disabled
          ? `
              color: ${p.theme.colors.palette.neutral.c70};
            `
          : `
              &:hover {
                text-decoration: underline;
              }
            `;
    }
  }}
  ${(p) =>
    p.iconButton
      ? css`
          width: ${p.theme.space[13]}px;
          padding: 0;
          ${IconContainer} {
            margin: 0;
          }
        `
      : ""}
  ${(p) => p.theme.transition()}
`;

const ContentContainer = styled.div``;

const Button = ({
  Icon,
  iconPosition = "right",
  iconSize = 16,
  children,
  onClick,
  ...props
}: ButtonProps): React.ReactElement => {
  return (
    // @ts-expect-error FIXME type button conflict
    <Base {...props} iconButton={!(Icon == null) && !children} onClick={onClick}>
      {iconPosition === "right" ? <ContentContainer>{children}</ContentContainer> : null}
      {Icon != null ? (
        <IconContainer iconPosition={iconPosition}>
          <Icon size={iconSize || fontSizes[props.fontSize ?? 4]} />
        </IconContainer>
      ) : null}
      {iconPosition === "left" ? <ContentContainer>{children}</ContentContainer> : null}
    </Base>
  );
};

const StyledExpandButton = styled(Button).attrs((props) => ({
  Icon: props.Icon != null || ChevronBottom,
  iconPosition: props.iconPosition || "right",
}))<{ expanded: boolean }>`
  ${IconContainer} {
    transition: transform 0.25s;
    ${(p) => (p.expanded ? "transform: rotate(180deg)" : "")}
  }
`;
export const ExpandButton = function ExpandButton({
  onToggle,
  onClick,
  ...props
}: React.PropsWithChildren<{
  onToggle?: (arg0: boolean) => void;
  onClick?: (arg0: React.SyntheticEvent<HTMLButtonElement>) => void;
}>): React.ReactElement {
  const [expanded, setExpanded] = useState(false);
  return (
    <StyledExpandButton
      {...props}
      expanded={expanded}
      onClick={(event: React.SyntheticEvent<HTMLButtonElement>) => {
        setExpanded((expanded) => !expanded);
        onToggle != null && onToggle(!expanded);
        onClick != null && onClick(event);
      }}
    />
  );
};
export default Button;
