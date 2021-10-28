import React from "react";
import styled from "styled-components";
import { color, ColorProps } from "styled-system";
import FlexBox from "../../layout/Flex";
import Text from "../../asorted/Text";
import Badge from "./Badge";
import Link, { LinkProps } from "../../cta/Link";
import { ExternalLinkMedium } from "../../../assets/icons";

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
} & ColorProps &
  React.ComponentProps<typeof Container>;

const Container = styled(FlexBox).attrs({
  p: 6,
  columnGap: 8,
  alignItems: "center",
})`
  border-radius: 8px;
  ${color}
`;

function Notification({
  title,
  description,
  badge,
  link,
  onLinkClick,
  ...containerProps
}: Props): JSX.Element {
  return (
    <Container {...containerProps}>
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
