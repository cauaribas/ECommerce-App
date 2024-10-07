import fastify from "fastify";
import { authRoutes } from "./routes/auth";
import { errorMiddleware } from "./middlewares/errors";

export const app = fastify();

app.setErrorHandler(errorMiddleware);

app.register(authRoutes, { prefix: '/auth' });