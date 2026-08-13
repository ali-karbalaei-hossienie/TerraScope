import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";

export default function SingleLayoutIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M4 4H20V20H4V4Z" />
    </SvgIcon>
  );
}
