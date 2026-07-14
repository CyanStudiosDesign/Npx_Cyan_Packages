import type { MouseEvent, ReactNode } from "react";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import "./style.css";

type CursorTrailProps = {
  children: ReactNode;
  extraClass?: string;
};

type TrailItem = {
  id: number;
  x: number;
  y: number;
  img: string;
  isRemoving: boolean;
};

const CURSOR_IMAGES = [
  "/img/cursor/Apple.png",
  "/img/cursor/Cyan.jpg",
  "/img/cursor/Cybercup.png",
  "/img/cursor/Realm.png",
];

export default function CursorTrail({
  children,
  extraClass = "",
}: CursorTrailProps) {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const imageIndex = useRef(0);

  const DISTANCE_THRESHOLD = 120;

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const x = e.pageX;
    const y = e.pageY;

    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > DISTANCE_THRESHOLD) {
      lastPos.current = { x, y };

      const id = Date.now() + Math.random();
      const img = CURSOR_IMAGES[imageIndex.current];
      imageIndex.current = (imageIndex.current + 1) % CURSOR_IMAGES.length;

      setTrail((prev) => [...prev, { id, x, y, img, isRemoving: false }]);

      setTimeout(() => {
        setTrail((prev) =>
          prev.map((t) => (t.id === id ? { ...t, isRemoving: true } : t))
        );
        setTimeout(() => {
          setTrail((prev) => prev.filter((t) => t.id !== id));
        }, 500);
      }, 100);
    }
  }, []);

  return (
    <div
      data-cursor="close"
      role="presentation"
      className={`cursor-trail-root ${extraClass}`}
      onMouseMove={handleMouseMove}
    >
      {children}
      {trail.map((t) => (
        <Image
          key={t.id}
          src={t.img}
          alt=""
          width={256}
          height={144}
          className={`cursor-trail-img ${t.isRemoving ? "scale-blur-out" : ""}`}
          style={{ top: t.y, left: t.x }}
        />
      ))}
    </div>
  );
}
