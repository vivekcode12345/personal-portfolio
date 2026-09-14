import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function useTiltHover({ max = 6, scale = 1.02, liftY = -6 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rotateX = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const rotateY = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const moveY = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    const scaleTo = gsap.quickTo(el, 'scale', { duration: 0.6, ease: 'power3.out' });

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;   /* 0 to 1 */
      const py = (e.clientY - rect.top) / rect.height;   /* 0 to 1 */
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
      const tiltX = (py - 0.5) * -2 * max;  /* invert so top of card tilts back */
      const tiltY = (px - 0.5) * 2 * max;
      rotateX(tiltX);
      rotateY(tiltY);
      moveY(liftY);
      scaleTo(scale);
    };

    const handleLeave = () => {
      rotateX(0);
      rotateY(0);
      moveY(0);
      scaleTo(1);
    };

    el.style.transformStyle = 'preserve-3d';
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [max, scale, liftY]);

  return ref;
}
