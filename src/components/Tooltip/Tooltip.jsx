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
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    // Add a slight delay before closing to allow moving mouse to the tooltip safely
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Handle Escape key to dismiss tooltip (WCAG 1.4.13 requirement)
  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  if (!content) {
    return children;
  }

  // Positioning classes
  // We use padding (p-*) instead of margin (m-*) to create an invisible "hover bridge".
  // This allows the user's cursor to travel from the trigger element into the tooltip
  // without triggering a mouseleave event (satisfies WCAG 1.4.13: Hoverable).
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 pb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 pt-2',
    left: 'right-full top-1/2 -translate-y-1/2 pr-2',
    right: 'left-full top-1/2 -translate-y-1/2 pl-2',
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
          className={`absolute ${currentPos} z-[9999]`}
        >
          {/* Inner tooltip box */}
          <div
            className={`dropdown-unroll px-2.5 py-1 text-[11px] font-semibold text-brand-10 bg-brand-bg/95 border border-brand-10/15 rounded-lg shadow-xl shadow-black/60 backdrop-blur-md max-w-[calc(100vw-2rem)] whitespace-normal break-words ${className}`}
          >
            {content}
          </div>
        </div>
      )}
    </div>
  );
}

export default Tooltip;
