"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const checkIsDesktop = () => {
      if (typeof window === "undefined") return false;
      const isFine = window.matchMedia("(pointer: fine)").matches;
      const isWide = window.innerWidth >= 768;
      return isFine && isWide;
    };

    if (!checkIsDesktop()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const textSpan = textRef.current;
    if (!dot || !ring) return;

    // Center initial placement off-screen
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    // GSAP quickTo provides direct GPU transforms bypassing React state renders
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.22, ease: "power2.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.22, ease: "power2.out" });

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("button, a, input, select, textarea, [data-cursor='hover'], .btn-kinetic, .btn-magnetic");
      const cursorText = target.getAttribute("data-cursor-text");

      if (cursorText && textSpan) {
        textSpan.textContent = cursorText;
        gsap.to(dot, { scale: 0, duration: 0.15 });
        gsap.to(ring, {
          width: 80,
          height: 80,
          backgroundColor: "#FFFFFF",
          borderColor: "#FFFFFF",
          duration: 0.25,
          ease: "power2.out"
        });
        gsap.to(textSpan, { opacity: 1, scale: 1, duration: 0.2 });
      } else if (interactive) {
        gsap.to(dot, { scale: 0, duration: 0.15 });
        gsap.to(ring, {
          width: 54,
          height: 54,
          backgroundColor: "rgba(212, 175, 55, 0.18)",
          borderColor: "rgba(212, 175, 55, 0.85)",
          duration: 0.25,
          ease: "power2.out"
        });
        if (textSpan) gsap.to(textSpan, { opacity: 0, scale: 0.5, duration: 0.15 });
      } else {
        gsap.to(dot, { scale: 1, duration: 0.2 });
        gsap.to(ring, {
          width: 24,
          height: 24,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.35)",
          duration: 0.25,
          ease: "power2.out"
        });
        if (textSpan) gsap.to(textSpan, { opacity: 0, scale: 0.5, duration: 0.15 });
      }
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.12, ease: "power2.out" });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.18, ease: "power2.out" });
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
      hasMoved = false;
    };

    const onResize = () => {
      const desktop = checkIsDesktop();
      if (!desktop) {
        gsap.set([dot, ring], { opacity: 0 });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      {/* Primary Dot - Hardware Accelerated with GSAP, strictly hidden on mobile via CSS */}
      <div
        ref={dotRef}
        data-custom-cursor
        className="custom-cursor-element fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform hidden md:block opacity-0"
      />

      {/* Outer Ring / Label Container - Hardware Accelerated with GSAP, strictly hidden on mobile via CSS */}
      <div
        ref={ringRef}
        data-custom-cursor
        className="custom-cursor-element fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9998] items-center justify-center border border-white/30 mix-blend-difference bg-white/5 backdrop-blur-[2px] will-change-transform hidden md:flex opacity-0"
      >
        <span
          ref={textRef}
          className="text-[10px] font-bold uppercase tracking-widest text-black opacity-0 scale-50 select-none pointer-events-none"
        />
      </div>
    </>
  );
};
