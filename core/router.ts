import type { CustomRequest } from "./http/custom-request.ts";
import type { CustomResponse } from "./http/custom-response.ts";

export type Handler = (
  req: CustomRequest,
  res: CustomResponse,
) => Promise<void> | void;

export type Middleware = (
  req: CustomRequest,
  res: CustomResponse,
) => Promise<void> | void;

type RouteDefinition = {
  handler: Handler;
  middleware: Middleware[];
};

type RoutesMiddleware = {
  [methos: string]: {
    [path: string]: {
      handler: Handler;
      middlewares: Middleware[];
    };
  };
};

type Routes = {
  GET: Record<string, RouteDefinition>;
  POST: Record<string, RouteDefinition>;
  PUT: Record<string, RouteDefinition>;
  DELETE: Record<string, RouteDefinition>;
  HEAD: Record<string, RouteDefinition>;
};

export class Router {
  routes: Routes | RoutesMiddleware = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
    HEAD: {},
  };
  middlewares: Middleware[] = [];
  get(route: string, handler: Handler, middleware: Middleware[] = []) {
    this.routes["GET"][route] = { handler, middleware };
  }
  post(route: string, handler: Handler, middleware: Middleware[] = []) {
    this.routes["POST"][route] = { handler, middleware };
  }
  put(route: string, handler: Handler, middleware: Middleware[] = []) {
    this.routes["PUT"][route] = { handler, middleware };
  }
  delete(route: string, handler: Handler, middleware: Middleware[] = []) {
    this.routes["DELETE"][route] = { handler, middleware };
  }
  head(route: string, handler: Handler, middleware: Middleware[] = []) {
    this.routes["HEAD"][route] = { handler, middleware };
  }
  use(middleware: Middleware[]) {
    this.middlewares.push(...middleware);
  }
  find(method: "GET" | "POST" | "PUT" | "DELETE" | "HEAD", pathname: string) {
    const routesByMethod = this.routes[method];
    if (!routesByMethod) return null;
    const matchedRoute = routesByMethod[pathname];
    if (matchedRoute) return { route: matchedRoute, params: {} };

    const reqParts = pathname.split("/").filter(Boolean);

    for (const route of Object.keys(routesByMethod)) {
      // Se a rota NÃO tiver ":" → pula ela
      if (!route.includes(":")) continue;
      const routeParts = route.split("/").filter(Boolean);
      if (reqParts.length !== routeParts.length) continue;
      if (reqParts[0] !== routeParts[0]) continue;

      const params: Record<string, string> = {};
      let ok: boolean = true;
      for (let i = 0; i < reqParts.length; i++) {
        const segment = routeParts[i];
        const value = reqParts[i];
        if (segment.startsWith(":")) {
          params[segment.slice(1)] = value;
        } else if (segment !== value) {
          ok = false;
          break;
        }
      }
      if (ok) {
        return { route: routesByMethod[route], params };
      }
    }
    return null;
  }
}
