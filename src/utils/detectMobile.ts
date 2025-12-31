/**
 * Detect if the user is on a mobile device
 */
export const isMobileDevice = (): boolean => {
  // Check for touch support and small screen size
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 1024;

  // Check user agent for mobile devices
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
  const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));

  return (hasTouch && isSmallScreen) || isMobileUA;
};

/**
 * Get text scale multiplier based on device type
 * Returns 1.0x for mobile (no scaling), 1x for desktop
 */
export const getTextScale = (): number => {
  return isMobileDevice() ? 1.0 : 1.0;
};
