import React from "react";
import styled from "styled-components";
import { color, ColorProps } from "styled-system";
import FlexBox from "../../layout/Flex";
import Text from "../../asorted/Text";
import Badge from "./Badge";
import type { Theme } from "../../../styles/theme";
import Link, { LinkProps } from "../../cta/Link";
import { ExternalLinkMedium } from "@ledgerhq/icons-ui/react";

export type Props = {
  /* The title to be displayed. */
  title: string;
  /* JSX that should be rendered by a call to the <Notification.Badge /> component.*/
  badge: React.ReactNode;
  /* An optional description. */
  description?: string;
  /* An optional link. */
  link?: string;
  /* A callback to perform when clicking on the link. */
  onLinkClick?: LinkProps["onClick"];
  /* Add the pre-selected background. */
  hasBackground?: boolean;
} & ColorProps &
  React.ComponentProps<typeof Container>;

const Container = styled(FlexBox).attrs({
  p: 6,
  columnGap: 8,
  alignItems: "center",
})<{ hasBackground?: boolean; theme: Theme }>`
  --notification-badge-border: ${(p) => {
    /* Set a CSS variable that will be consumed by the Badge component */
    return p.hasBackground
      ? p.theme.colors.palette.neutral.c30
      : p.theme.colors.palette.background.main;
  }};
  background-color: ${(p) =>
    p.hasBackground ? p.theme.colors.palette.neutral.c30 : "transparent"};

  border-radius: 8px;
  ${color}
`;

function Notification({
  title,
  description,
  badge,
  link,
  onLinkClick,
  hasBackground = false,
  ...containerProps
}: Props): JSX.Element {
  return (
    <Container {...containerProps} hasBackground={hasBackground}>
      {badge}
      <FlexBox flexDirection="column" rowGap={3} flex="auto">
        <Text variant={"large"} fontWeight="medium" color="palette.neutral.c100">
          {title}
        </Text>
        {description && (
          <Text variant={"paragraph"} fontWeight="medium" color="palette.neutral.c80">
            {description}
          </Text>
        )}
        {link && (
          <FlexBox justifyContent={"flex-start"}>
            <Link onClick={(event) => onLinkClick && onLinkClick(event)} Icon={ExternalLinkMedium}>
              {link}
            </Link>
          </FlexBox>
        )}
      </FlexBox>
    </Container>
  );
}
Notification.Badge = Badge;

export type NotificationType = { (p: Props): JSX.Element; Badge: typeof Badge };
export default Notification as NotificationType;
