import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* ImageResponse only supports <img>, not next/image. */
/* eslint-disable @next/next/no-img-element */

export const ogSize = {
  width: 1200,
  height: 630,
};

export async function getAvatarSrc() {
  const data = await readFile(join(process.cwd(), "public/avatar.png"));
  return `data:image/png;base64,${data.toString("base64")}`;
}

export async function createOgImage({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const avatarSrc = await getAvatarSrc();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#000000",
          color: "#ffffff",
          padding: "72px",
          gap: "64px",
        }}
      >
        <img
          src={avatarSrc}
          width={320}
          height={320}
          alt=""
          style={{
            borderRadius: 160,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: title.length > 32 ? 48 : 64,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.04em",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                marginTop: 16,
                fontSize: 28,
                color: "#a1a1aa",
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    ),
    ogSize,
  );
}
