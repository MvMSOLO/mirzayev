import type { CSSProperties } from "react";

const paths: Record<string, string> = {
  a: "M421,318Q371,386,296,412Q221,438,158,394Q95,350,78,275Q61,200,116,146Q171,92,246,88Q321,84,377,138Q433,192,441,246Q449,300,421,318Z",
  b: "M420,300Q392,380,317,411Q242,442,164,411Q86,380,76,300Q66,220,132,161Q198,102,286,96Q374,90,417,175Q460,260,420,300Z",
  c: "M410,304Q382,368,318,401Q254,434,180,410Q106,386,84,308Q62,230,124,171Q186,112,271,102Q356,92,405,171Q454,250,432,275Q410,300,410,304Z",
  d: "M430,290Q400,380,308,414Q216,448,144,394Q72,340,88,244Q104,148,196,116Q288,84,368,132Q448,180,439,240Q430,300,430,290Z",
  e: "M400,320Q380,400,290,420Q200,440,130,380Q60,320,90,220Q120,120,220,90Q320,60,390,140Q460,220,430,260Q400,300,400,320Z",
  f: "M420,300Q420,400,320,420Q220,440,150,370Q80,300,110,200Q140,100,240,90Q340,80,400,150Q460,220,440,260Q420,300,420,300Z",
};

interface Props {
  variant: keyof typeof paths;
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

export function Blob({ variant, src, alt, className = "", style }: Props) {
  const id = `blob-${variant}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg viewBox="0 0 500 500" className={className} style={style} role="img" aria-label={alt}>
      <defs>
        <clipPath id={id} clipPathUnits="userSpaceOnUse">
          <path d={paths[variant]} />
        </clipPath>
      </defs>
      <image
        href={src}
        x="0"
        y="0"
        width="500"
        height="500"
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${id})`}
      />
      <path d={paths[variant]} fill="none" stroke="#111" strokeOpacity="0.15" strokeWidth="1" />
    </svg>
  );
}
