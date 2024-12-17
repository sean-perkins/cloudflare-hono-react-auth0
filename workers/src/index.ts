import { Context, Hono, Next } from "hono";
import { cors } from "hono/cors";
import { createRemoteJWKSet, jwtVerify } from "jose";

// Create Hono app with JWT variables
type Variables = {
  userId?: string;
};

type Bindings = {
  AUTH0_DOMAIN: string;
  AUTH0_AUDIENCE: string;
};

const app = new Hono<{ Variables: Variables; Bindings: Bindings }>();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Authorization", "Content-Type"],
  })
);

const authMiddleware = async (
  c: Context,
  next: Next
): Promise<Response | void> => {
  const { AUTH0_DOMAIN, AUTH0_AUDIENCE } = c.env;
  const AUTH0_ISSUER = `https://${AUTH0_DOMAIN}/`;

  const token = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return c.json({ error: "No token provided" }, 401);
  }

  try {
    const JWKS = createRemoteJWKSet(
      new URL(`${AUTH0_ISSUER}.well-known/jwks.json`)
    );

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: AUTH0_ISSUER,
      audience: AUTH0_AUDIENCE,
    });

    c.set("userId", payload.sub);

    await next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return c.json({ error: "Invalid token" }, 401);
  }
};

// Public route
app.get("/api/public", (c) => {
  return c.json({ message: "Public endpoint" });
});

// Protected route
app.get("/api/protected", authMiddleware, (c) => {
  const userId = c.get("userId");
  return c.json({
    message: "Protected endpoint",
    userId,
  });
});

export default app;
