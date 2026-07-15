export const MOBILE_NAV_ROUTES = ["/", "/portfolio", "/skills", "/blog"];

export const getMobileNavIndex = (pathname) => {
  if (pathname === "/") return 0;
  if (pathname.startsWith("/portfolio")) return 1;
  if (pathname === "/skills") return 2;
  if (pathname === "/blog") return 3;
  return 0;
};
