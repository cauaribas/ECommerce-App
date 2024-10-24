import { FastifyInstance } from "fastify";
import { createAddress, deleteAddress, getAddresses, updateAddress } from "../controllers/users/user-addresses-controller";
import { authMiddleware } from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import { updateUsers } from "../controllers/users/user";

export async function usersRoutes(app: FastifyInstance) {
    app.post('/address', { onRequest: authMiddleware }, errorHandler(createAddress));
    app.get('/address', { onRequest: authMiddleware }, errorHandler(getAddresses));
    app.delete('/address/:id', { onRequest: authMiddleware }, errorHandler(deleteAddress));
    app.put('/address', { onRequest: authMiddleware}, errorHandler(updateUsers));
}