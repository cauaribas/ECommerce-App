import { FastifyInstance } from 'fastify';
import { authMiddleware } from '../middlewares/auth';
import { cancelOrder, changeStatus, createOrder, getOrderById, listAllOrders, listOrders, listUsersOrders } from '../controllers/orders/orders';
import { errorHandler } from '../error-handler';
import { adminMiddleware } from '../middlewares/admin';

export async function ordersRoutes(app: FastifyInstance) {
    app.post('/', { onRequest: [ authMiddleware ] }, errorHandler(createOrder));
    app.get('/', { onRequest: [ authMiddleware ] }, errorHandler(listOrders));
    app.get('/:id', { onRequest: [ authMiddleware ] }, errorHandler(getOrderById));
    app.get('/index', { onRequest: [ authMiddleware, adminMiddleware ] }, errorHandler(listAllOrders));
    app.get('/users', { onRequest: [ authMiddleware ] }, errorHandler(listUsersOrders));
    app.put('/:id/cancel', { onRequest: [ authMiddleware ] }, errorHandler(cancelOrder));
    app.put('/:id/status', { onRequest: [ authMiddleware, adminMiddleware ] }, errorHandler(changeStatus));
}