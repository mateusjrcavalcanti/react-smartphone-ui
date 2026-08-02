import { useEffect, useMemo, useState } from "react";

import { SmartphoneFrame } from "./smartphone-frame";
import type { DeviceMode, DevicePreviewProps } from "./types";

export function DevicePreview({
  initialMode = "smartphone",
  responsive = true,
  ...frameProps
}: DevicePreviewProps) {
  const [mode, setMode] = useState<DeviceMode>(initialMode);
  const [scale, setScale] = useState(1);
  const size = useMemo(
    () => (mode === "tablet" ? { width: 980, height: 580 } : { width: 380, height: 760 }),
    [mode],
  );

  useEffect(() => {
    if (!responsive) return;
    const update = () => {
      const widthScale = (window.innerWidth - 48) / size.width;
      const heightScale = (window.innerHeight - 80) / size.height;
      setScale(Math.max(0.45, Math.min(1.2, widthScale, heightScale)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [responsive, size]);

  return (
    <div className="sui-preview" style={{ width: size.width * scale, height: size.height * scale }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <SmartphoneFrame
          {...frameProps}
          deviceMode={mode}
          onRotate={() => setMode((current) => (current === "smartphone" ? "tablet" : "smartphone"))}
        />
      </div>
    </div>
  );
}
