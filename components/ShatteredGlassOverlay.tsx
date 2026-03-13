"use client";

import { motion } from "framer-motion";

// Impact sits at the P.D. heading — horizontally centered, upper portion.
// Only 5 cracks radiate from it. That's it.
const IX = 960,
  IY = 245;

type Shard = { points: [number, number][]; filter: string };
type Band = { points: [number, number][]; filter: string; opacity: number };

function toClipPath(pts: [number, number][]) {
  return `polygon(${pts.map(([x, y]) => `${((x/1920)*100).toFixed(2)}% ${((y/1080)*100).toFixed(2)}%`).join(", ")})`;
}

// 5 cracks → 5 large shard regions.
// Facets apply a very slight blur + contrast so the background UI appears to
// bend through the glass without completely re-lighting the scene.
const SHARDS: Shard[] = [
  // Top (between crack NW and crack NE)
  {
    points: [[IX, IY], [85, 0], [0, 0], [0, 0], [1480, 0]],
    filter: "blur(1.5px) brightness(1.0) contrast(1.03) saturate(1.0)",
  },
  // Top-right (between crack NE and crack E)
  {
    points: [[IX, IY], [1480, 0], [1920, 0], [1920, 520]],
    filter: "blur(1.8px) brightness(1.02) contrast(1.04) saturate(1.0)",
  },
  // Bottom-right (between crack E and crack SE)
  {
    points: [[IX, IY], [1920, 520], [1920, 1080], [1380, 1080]],
    filter: "blur(1.6px) brightness(0.99) contrast(1.03) saturate(1.0)",
  },
  // Bottom (between crack SE and crack SW)
  {
    points: [[IX, IY], [1380, 1080], [0, 1080], [0, 720]],
    filter: "blur(1.4px) brightness(0.98) contrast(1.03) saturate(1.0)",
  },
  // Left (between crack SW and crack NW)
  {
    points: [[IX, IY], [0, 720], [0, 0], [85, 0]],
    filter: "blur(1.5px) brightness(0.97) contrast(1.03) saturate(1.0)",
  },
];

// Narrow refraction bands that hug each main crack; these create a stronger
// sense that the crack line itself is bending the UI behind it.
const CRACK_BANDS: Band[] = [
  // NW band
  {
    points: [
      [960, 245],
      [900, 205],
      [880, 210],
      [830, 170],
      [810, 176],
      [760, 140],
      [740, 146],
      [690, 116],
      [670, 122],
      [620, 90],
      [600, 96],
      [540, 68],
      [520, 74],
      [430, 36],
      [410, 42],
      [320, 16],
      [300, 22],
      [200, 6],
      [180, 12],
      [85, 0],
    ],
    filter: "blur(4px) contrast(1.08) brightness(1.02)",
    opacity: 0.45,
  },
  // NE band
  {
    points: [
      [960, 245],
      [1020, 205],
      [1040, 210],
      [1090, 170],
      [1110, 176],
      [1160, 140],
      [1180, 146],
      [1230, 116],
      [1250, 122],
      [1310, 90],
      [1330, 96],
      [1400, 68],
      [1420, 74],
      [1500, 46],
      [1520, 52],
      [1600, 30],
      [1620, 36],
      [1700, 18],
      [1720, 24],
      [1800, 8],
      [1820, 14],
      [1480, 0],
    ],
    filter: "blur(4px) contrast(1.08) brightness(1.04)",
    opacity: 0.4,
  },
  // E band
  {
    points: [
      [960, 245],
      [1010, 270],
      [1030, 276],
      [1100, 298],
      [1120, 304],
      [1190, 328],
      [1210, 334],
      [1280, 360],
      [1300, 366],
      [1380, 392],
      [1400, 398],
      [1500, 430],
      [1520, 436],
      [1620, 462],
      [1640, 468],
      [1740, 494],
      [1760, 500],
      [1860, 520],
      [1880, 526],
      [1920, 520],
    ],
    filter: "blur(4px) contrast(1.08) brightness(1.03)",
    opacity: 0.42,
  },
  // SE band
  {
    points: [
      [960, 245],
      [980, 290],
      [1000, 296],
      [1030, 360],
      [1050, 366],
      [1080, 430],
      [1100, 436],
      [1130, 500],
      [1150, 506],
      [1190, 580],
      [1210, 586],
      [1250, 660],
      [1270, 666],
      [1305, 738],
      [1325, 744],
      [1350, 810],
      [1370, 816],
      [1380, 1080],
      [1340, 1080],
      [1300, 980],
      [1260, 900],
      [1220, 820],
      [1180, 740],
      [1140, 660],
      [1100, 580],
      [1060, 500],
      [1020, 420],
      [980, 340],
      [940, 280],
    ],
    filter: "blur(4px) contrast(1.06) brightness(1.02)",
    opacity: 0.38,
  },
  // SW band
  {
    points: [
      [960, 245],
      [930, 280],
      [910, 286],
      [870, 340],
      [850, 346],
      [810, 400],
      [790, 406],
      [740, 450],
      [720, 456],
      [660, 500],
      [640, 506],
      [580, 540],
      [560, 546],
      [500, 574],
      [480, 580],
      [420, 602],
      [400, 608],
      [320, 634],
      [300, 640],
      [220, 664],
      [200, 670],
      [120, 694],
      [100, 700],
      [0, 720],
      [0, 700],
      [80, 676],
      [160, 652],
      [240, 628],
      [320, 604],
      [400, 580],
      [480, 556],
      [560, 532],
      [640, 508],
      [720, 484],
      [800, 460],
      [840, 440],
      [880, 410],
      [900, 380],
      [920, 350],
      [940, 315],
    ],
    filter: "blur(4px) contrast(1.06) brightness(0.99)",
    opacity: 0.38,
  },
];

export function ShatteredGlassOverlay() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 30 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glass facets — subtle blur/contrast makes UI appear to bend behind cracks */}
      {SHARDS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            clipPath: toClipPath(s.points),
            backdropFilter: s.filter,
            WebkitBackdropFilter: s.filter,
          }}
        />
      ))}

      {/* Refraction bands hugging each main crack */}
      {CRACK_BANDS.map((b, i) => (
        <div
          key={`band-${i}`}
          style={{
            position: "absolute",
            inset: 0,
            clipPath: toClipPath(b.points),
            backdropFilter: b.filter,
            WebkitBackdropFilter: b.filter,
            mixBlendMode: "screen",
            opacity: b.opacity,
          }}
        />
      ))}

      {/* Localized impact distortion — stronger blur right around the hit point */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `circle(18% at ${(IX / 1920) * 100}% ${(IY / 1080) * 100}%)`,
          backdropFilter: "blur(3px) contrast(1.06)",
          WebkitBackdropFilter: "blur(3px) contrast(1.06)",
          mixBlendMode: "screen",
          opacity: 0.55,
        }}
      />

      <svg
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Dark gap — shadow side of each crack */}
        <g
          stroke="rgba(0,0,0,0.7)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="miter"
          style={{ mixBlendMode: "multiply" }}
        >
          {/* NW — to top-left */}
          <path d="M960,245 L872,178 L758,108 L598,52 L85,0" />
          {/* NE — to top-right */}
          <path d="M960,245 L1055,158 L1184,78 L1358,28 L1480,0" />
          {/* E — to right */}
          <path d="M960,245 L1188,308 L1452,398 L1704,462 L1920,520" />
          {/* SE — to bottom-right */}
          <path d="M960,245 L1024,418 L1124,622 L1254,852 L1380,1080" />
          {/* SW/W — to left-bottom */}
          <path d="M960,245 L808,374 L612,494 L352,598 L0,720" />
        </g>

        {/* Bright edge — lit side of the glass */}
        <g
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="miter"
          style={{ mixBlendMode: "screen" }}
        >
          <path d="M960,245 L872,178 L758,108 L598,52 L85,0" />
          <path d="M960,245 L1055,158 L1184,78 L1358,28 L1480,0" />
          <path d="M960,245 L1188,308 L1452,398 L1704,462 L1920,520" />
          <path d="M960,245 L1024,418 L1124,622 L1254,852 L1380,1080" />
          <path d="M960,245 L808,374 L612,494 L352,598 L0,720" />
        </g>

        {/* Small secondary branching cracks — just 2, for realism */}
        <g stroke="rgba(0,0,0,0.60)" strokeWidth="1.3" fill="none" strokeLinecap="butt">
          <path d="M758,108 L660,0" />
          <path d="M1124,622 L1310,730" />
        </g>
        <g stroke="rgba(255,255,255,0.32)" strokeWidth="0.55" fill="none" strokeLinecap="butt">
          <path d="M758,108 L660,0" />
          <path d="M1124,622 L1310,730" />
        </g>

        {/* Micro-crazing at impact */}
        <g stroke="rgba(0,0,0,0.65)" strokeWidth="1.0" fill="none">
          <path d="M960,245 L948,232 L934,218" />
          <path d="M960,245 L974,231 L990,216" />
          <path d="M960,245 L966,258 L975,272" />
          <path d="M960,245 L950,260 L940,276" />
          <path d="M960,245 L940,242 L920,236" />
          <path d="M960,245 L980,248 L1002,254" />
        </g>
        <g stroke="rgba(255,255,255,0.40)" strokeWidth="0.5" fill="none">
          <path d="M960,245 L948,232 L934,218" />
          <path d="M960,245 L974,231 L990,216" />
          <path d="M960,245 L966,258 L975,272" />
          <path d="M960,245 L950,260 L940,276" />
          <path d="M960,245 L940,242 L920,236" />
          <path d="M960,245 L980,248 L1002,254" />
        </g>

        {/* Impact chip */}
        <circle cx={IX} cy={IY} r="12" fill="rgba(0,0,0,0.28)" />
        <circle cx={IX} cy={IY} r="5"  fill="rgba(255,255,255,0.22)" />
        <circle cx={IX} cy={IY} r="2"  fill="rgba(255,255,255,0.92)" />
      </svg>
    </motion.div>
  );
}
