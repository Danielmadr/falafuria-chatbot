// utils/avatarUtils.ts
export const getUserAvatarSrc = (theme?: string) => {
  return theme === "dark"
    ? "userAvatar-White.png"
    : "userAvatar-Black.png";
};
