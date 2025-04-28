/**
 * @module utils/avatarUtils
 * @description Utility functions for handling avatar images with theme-based switching.
 * This module provides tools for selecting appropriate avatar images based on the current
 * theme and preloading images to prevent flickering during theme changes.
 */

/**
 * File paths for user avatar images in different themes.
 * These constants define the relative paths to avatar image assets.
 *
 * @constant {string} USER_AVATAR_DARK - Path to user avatar image for dark theme
 * @constant {string} USER_AVATAR_LIGHT - Path to user avatar image for light theme
 */
const USER_AVATAR_DARK = "userAvatar-White.png";
const USER_AVATAR_LIGHT = "userAvatar-Black.png";

/**
 * Returns the appropriate user avatar image source based on the current theme.
 * This function selects between dark and light theme avatar images.
 *
 * @param {string} [theme] - The current theme ('dark' or 'light')
 * @returns {string} Path to the appropriate user avatar image
 */
export const getUserAvatarSrc = (theme?: string): string => {
  return theme === "dark" ? USER_AVATAR_DARK : USER_AVATAR_LIGHT;
};

/**
 * Preloads all avatar images to prevent flickering when changing themes.
 * This function should be called early in the application lifecycle,
 * ideally during initial loading or component mounting.
 *
 * @returns {void}
 */
export const preloadAvatarImages = (): void => {
  const imagesToPreload = [USER_AVATAR_DARK, USER_AVATAR_LIGHT];

  imagesToPreload.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};
