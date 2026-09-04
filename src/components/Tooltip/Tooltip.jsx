import React, { useState, useRef, useEffect } from 'react';

/**
 * Standard UI Kit Tooltip Component
 * 
 * @param {React.ReactNode} content
 * @param {'top' | 'bottom' | 'left' | 'right'} [position='top']
 * @param {number} [delay=150]
 * @param {string} [className='']
 * @param {React.ReactNode} children
 */
export function Tooltip({
  content,
  position = 'top',
  delay = 150,
  className = '',
  children,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!content) {
    return children;
  }

  // Positioning classes
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const currentPos = positionClasses[position] || positionClasses.top;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className="relative inline-flex items-center"
    >
      {children}

      {isVisible && (
        <div
          role="tooltip"
          className={`absolute ${currentPos} z-[9999] pointer-events-none px-2.5 py-1 text-[11px] font-semibold text-brand-10 bg-brand-bg/95 border border-brand-10/15 rounded-lg shadow-xl shadow-black/60 backdrop-blur-md max-w-[calc(100vw-2rem)] whitespace-normal break-words dropdown-unroll ${className}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
