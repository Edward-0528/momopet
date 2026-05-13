import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

/**
 * AnimatedNumber — smoothly rolls from the previous value to the new value.
 * @param {number}  value      - the target number to display
 * @param {string}  prefix     - e.g. "$"
 * @param {string}  suffix     - e.g. "+"
 * @param {number}  decimals   - decimal places (default 2)
 */
export default function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 2 }) {
  const motionVal = useMotionValue(value);
  const prevRef   = useRef(value);

  // Round and format during the tween
  const display = useTransform(motionVal, (latest) => {
    const fixed = latest.toFixed(decimals);
    return `${prefix}${Number(fixed).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;
  });

  useEffect(() => {
    if (prevRef.current === value) return;
    const controls = animate(motionVal, value, {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    });
    prevRef.current = value;
    return controls.stop;
  }, [value, motionVal]);

  return <motion.span>{display}</motion.span>;
}
