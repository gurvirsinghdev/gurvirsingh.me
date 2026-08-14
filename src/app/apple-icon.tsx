import { getAvatarSrc } from "@/lib/og";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const avatarSrc = await getAvatarSrc();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={avatarSrc}
          width={180}
          height={180}
          alt=""
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    size,
  );
}
