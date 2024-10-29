import { FastifyInstance } from "fastify";
import { createAddress, deleteAddress, getAddresses, updateAddress } from "../controllers/users/user-addresses-controller";
import { authMiddleware } from "../middlewares/auth";
import { errorHandler } from "../error-handler";
import { changeUserRole, getUserById, getUsers, updateUsers } from "../controllers/users/user";
import { adminMiddleware } from "../middlewares/admin";

export async function usersRoutes(app: FastifyInstance) {
    app.post('/address', { onRequest: authMiddleware }, errorHandler(createAddress));
    app.get('/address', { onRequest: authMiddleware }, errorHandler(getAddresses));
    app.delete('/address/:id', { onRequest: authMiddleware }, errorHandler(deleteAddress));
    app.put('/address', { onRequest: authMiddleware}, errorHandler(updateUsers));
    app.put('/:id/role', { onRequest: [ authMiddleware, adminMiddleware] }, errorHandler(changeUserRole));
    app.get('/', { onRequest: [ authMiddleware, adminMiddleware] }, errorHandler(getUsers));
    app.get('/:id', { onRequest: [ authMiddleware, adminMiddleware] }, errorHandler(getUserById));
}