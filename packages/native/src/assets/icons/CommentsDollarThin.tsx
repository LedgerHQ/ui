import * as React from "react";
import Svg, { Path } from "react-native-svg";
type Props = {
  size?: number | string;
  color?: string;
};

function CommentsDollarThin({
  size = 16,
  color = "currentColor",
}: Props): JSX.Element {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.64 5.004v12.312l3.816-2.952H17.76v-9.36c0-.984-.816-1.8-1.8-1.8H4.44c-.984 0-1.8.816-1.8 1.8zm.48 11.328V5.004c0-.72.6-1.32 1.32-1.32h11.52c.72 0 1.32.6 1.32 1.32v8.88H6.288L3.12 16.332zm4.32-.288c0 .984.816 1.8 1.8 1.8h8.28l3.84 2.952V8.748c0-.984-.816-1.8-1.8-1.8v.48c.72 0 1.32.6 1.32 1.32v11.064l-3.192-2.448H9.24c-.72 0-1.32-.6-1.32-1.32h-.48zm.336-6.456c.024 1.32.864 2.136 2.088 2.256v.672h.48v-.672c1.2-.072 2.016-.768 2.016-1.8 0-.936-.72-1.488-1.728-1.608l-.288-.048V6.036c.96.072 1.44.648 1.44 1.608h.48c0-1.176-.72-1.992-1.92-2.088v-.672h-.48v.696c-1.008.096-1.824.744-1.824 1.704 0 .864.624 1.392 1.584 1.512l.24.024v2.544c-.984-.096-1.584-.72-1.608-1.776h-.48zm.744-2.304c0-.696.528-1.152 1.344-1.224v2.28l-.192-.024C8.88 8.22 8.52 7.908 8.52 7.284zm1.824 4.08V8.892l.24.024c.84.096 1.296.456 1.296 1.128 0 .768-.552 1.248-1.536 1.32z"
        fill={color}
      />
    </Svg>
  );
}

export default CommentsDollarThin;