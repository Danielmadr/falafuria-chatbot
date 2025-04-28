// utils/avatarUtils.ts

/**
 * Utility functions for handling avatar images
 */

// Constants for avatar image paths
const USER_AVATAR_DARK = "userAvatar-White.png";
const USER_AVATAR_LIGHT = "userAvatar-Black.png";

/**
 * Returns the appropriate user avatar source based on the current theme
 * 
 * @param theme - The current theme ('dark' or 'light')
 * @returns Path to the user avatar image
 */
export const getUserAvatarSrc = (theme?: string): string => {
  return theme === "dark"
    ? USER_AVATAR_DARK
    : USER_AVATAR_LIGHT;
};


/**
 * Preloads avatar images to prevent flickering when changing themes
 */
export const preloadAvatarImages = (): void => {
  const imagesToPreload = [USER_AVATAR_DARK, USER_AVATAR_LIGHT];
  
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};