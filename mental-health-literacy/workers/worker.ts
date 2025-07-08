import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env, ctx) {
    // Set JSON response headers
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Enable CORS if needed
    };
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (path === "/api") {
      const data = {
        message: "Welcome to the API",
        timestamp: new Date().toISOString(),
      };
      return new Response(JSON.stringify(data), { headers });
    }

    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<Env>;
