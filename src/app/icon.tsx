import { getAvatarSrc } from "@/lib/og";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          width={32}
          height={32}
          alt=""
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    size,
  );
}
