import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import routes from './utils/routes';
import { TOKEN_NAME } from './utils/constants';

export function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_NAME);
  const isTokenValid = token && token.value !== 'undefined';
  const pathname = req.nextUrl.pathname;

  const protectedRoutes = ['/dashboard', '/students', '/reflections', '/goals'];
  const authRoutes = [routes.login.url, routes.signup.url];

  const isProtectedRoute = protectedRoutes.some((path) =>
    pathname.startsWith(path),
  );
  const isAuthRoute = authRoutes.includes(pathname);

  if (isTokenValid && isAuthRoute) {
    return NextResponse.redirect(new URL(routes.dashboard.url, req.url));
  }

  if (!isTokenValid && isProtectedRoute) {
    // Cleaner URL: Remove the leading slash from the pathname
    const pathnameWithoutSlash = pathname.substring(1);

    return NextResponse.redirect(
      new URL(
        `${routes.login.url}?redirectTo=/${pathnameWithoutSlash}`,
        req.url,
      ),
    );
  }

  return NextResponse.next();
}

// import type { NextRequest } from 'next/server';
// import { NextResponse } from 'next/server';
// import routes from './utils/routes';
// import { TOKEN_NAME } from './utils/constants';

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get(TOKEN_NAME);
//   const isTokenValid = token && token.value !== 'undefined';

//   const redirectToLogin = () => {
//     return NextResponse.redirect(
//       new URL(
//         `${routes.login.url}?redirectTo=${req.nextUrl.pathname}`,
//         req.url,
//       ),
//     );
//   };

//   const allowAccess = () => {
//     return NextResponse.next();
//   };

//   const protectedRoutes = ['/dashboard', '/students', '/reflections', '/goals'];
//   const authRoutes = [routes.login.url, routes.signup.url];

//   if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
//     return isTokenValid ? allowAccess() : redirectToLogin();
//   }

//   if (authRoutes.includes(req.nextUrl.pathname)) {
//     return isTokenValid
//       ? NextResponse.redirect(new URL(routes.dashboard.url, req.url))
//       : allowAccess();
//   }

//   // return allowAccess();
// }
