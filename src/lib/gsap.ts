import gsap from "gsap";

// Configure default performance settings
if (typeof window !== "undefined") {
  gsap.config({
    autoSleep: 60,
    force3D: true,
  });
  gsap.defaults({
    ease: "power3.out",
    duration: 0.6,
  });
}

/**
 * Hardware-accelerated magnetic pull effect for interactive buttons.
 * Uses gsap.quickTo to directly transform elements on GPU without triggering React renders.
 */
export function createMagneticEffect(el: HTMLElement, strength = 0.3) {
  const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power2.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power2.out" });

  const onMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    xTo(x);
    yTo(y);
  };

  const onMouseLeave = () => {
    xTo(0);
    yTo(0);
  };

  el.addEventListener("mousemove", onMouseMove);
  el.addEventListener("mouseleave", onMouseLeave);

  return () => {
    el.removeEventListener("mousemove", onMouseMove);
    el.removeEventListener("mouseleave", onMouseLeave);
  };
}

/**
 * High-performance stagger reveal for UI elements using GSAP ticker.
 */
export function gsapStaggerReveal(
  targets: string | HTMLElement[] | NodeListOf<Element>,
  vars?: gsap.TweenVars
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power3.out", ...vars }
  );
}

/**
 * GPU-accelerated numeric counter animation for HUD stats and metrics.
 */
export function gsapCounter(
  target: { value: number },
  endValue: number,
  onUpdate: (val: number) => void,
  duration = 1.5
) {
  return gsap.to(target, {
    value: endValue,
    duration,
    ease: "power2.out",
    onUpdate: () => onUpdate(Math.round(target.value)),
  });
}

export { gsap };
export default gsap;
