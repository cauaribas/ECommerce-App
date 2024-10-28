import fastify from "fastify";
import { authRoutes } from "./routes/auth";
import { errorMiddleware } from "./middlewares/errors";
import { productsRoutes } from "./routes/products";
import { usersRoutes } from "./routes/users";
import { cartRoutes } from "./routes/cart";
import { ordersRoutes } from "./routes/orders";

export const app = fastify();

app.setErrorHandler(errorMiddleware);

app.register(authRoutes, { prefix: '/auth' });
app.register(productsRoutes);
app.register(usersRoutes, { prefix: '/users' });
app.register(cartRoutes, { prefix: '/cart' });
app.register(ordersRoutes, { prefix: '/orders' });