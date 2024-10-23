import { FastifyInstance } from "fastify";
import { createAddress, deleteAddress, getAddresses, updateAddress } from "../controllers/users/user-addresses-controller";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";
import { errorHandler } from "../error-handler";

export async function usersRoutes(app: FastifyInstance) {
    app.post('/address', { onRequest: authMiddleware }, errorHandler(createAddress));
    app.get('/address', { onRequest: authMiddleware }, errorHandler(getAddresses));
    app.patch('/address/:id', { onRequest: authMiddleware }, errorHandler(updateAddress));
    app.delete('/address/:id', { onRequest: authMiddleware }, errorHandler(deleteAddress));
}