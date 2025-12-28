export const isExcludedFromSidebar = (
  pathname: string,
  excludedRoutes: string[],
) => {
  return excludedRoutes.some((route) => {
    if (route.endsWith('*')) {
      return pathname.startsWith(route.replace('*', ''));
    }

    return pathname === route || pathname.startsWith(route + '/');
  });
};