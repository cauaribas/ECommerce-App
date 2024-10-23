import fastify from "fastify";
import { authRoutes } from "./routes/auth";
import { errorMiddleware } from "./middlewares/errors";
import { productsRoutes } from "./routes/products";
import { usersRoutes } from "./routes/users";

export const app = fastify();

app.setErrorHandler(errorMiddleware);

app.register(authRoutes, { prefix: '/auth' });
app.register(productsRoutes);
app.register(usersRoutes, { prefix: '/users' });