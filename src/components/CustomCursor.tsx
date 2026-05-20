import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'view' | 'next' | 'close' | 'copy' | 'external'>('default');
  const [isVisible, setIsVisible] = useState(false);

  // Absolute coordinate monitoring
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Elastic spring properties for a luxurious fluid glide feel
  const springConfig = { stiffness: 220, damping: 25, mass: 0.45 };
  const followerX = useSpring(cursorX, springConfig);
  const followerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable customized cursors strictly on touch interface screens
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Detect deliberate custom cursor instructions
      const cursorAttrEl = target.closest('[data-cursor]');
      if (cursorAttrEl) {
        const type = cursorAttrEl.getAttribute('data-cursor') as any;
        if (type) {
          setCursorType(type);
          return;
        }
      }

      // Check traditional design interactive tags to expand hover circles
      const isInteractive = target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer');
      if (isInteractive) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const isTextType = cursorType === 'view' || cursorType === 'next' || cursorType === 'close' || cursorType === 'copy' || cursorType === 'external';

  return (
    <>
      {/* 1. Precise Center Dot */}
      <motion.div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-brand-accent pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: cursorType === 'default' ? 1 : 0.3,
          opacity: isTextType ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* 2. Fluid Outer Follower Bubble */}
      <motion.div
        id="custom-cursor-follower"
        className="fixed top-0 left-0 rounded-full border border-brand-accent pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference flex items-center justify-center font-mono leading-none"
        style={{ x: followerX, y: followerY }}
        animate={{
          width: cursorType === 'view' ? 80 : 
                 cursorType === 'next' ? 80 : 
                 cursorType === 'close' ? 56 : 
                 cursorType === 'copy' ? 68 :
                 cursorType === 'external' ? 44 :
                 cursorType === 'hover' ? 42 : 20,
          height: cursorType === 'view' ? 80 : 
                  cursorType === 'next' ? 80 : 
                  cursorType === 'close' ? 56 : 
                  cursorType === 'copy' ? 68 :
                  cursorType === 'external' ? 44 :
                  cursorType === 'hover' ? 42 : 20,
          backgroundColor: isTextType ? 'var(--color-brand-accent)' : 'rgba(236, 231, 225, 0)',
          borderWidth: isTextType ? 0 : 1.2,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 24, mass: 0.35 }}
      >
        {isTextType && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="select-none text-[10px] font-medium tracking-tight text-brand-bg font-mono"
          >
            {cursorType === 'view' && 'view'}
            {cursorType === 'next' && 'next'}
            {cursorType === 'close' && 'close'}
            {cursorType === 'copy' && 'copy'}
            {cursorType === 'external' && 'open'}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
