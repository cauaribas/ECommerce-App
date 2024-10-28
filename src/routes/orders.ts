import { FastifyInstance } from 'fastify';
import { authMiddleware } from '../middlewares/auth';
import { cancelOrder, createOrder, getOrderById, listOrders } from '../controllers/orders/orders';
import { errorHandler } from '../error-handler';

export async function ordersRoutes(app: FastifyInstance) {
    app.post('/', { onRequest: [ authMiddleware ] }, errorHandler(createOrder));
    app.get('/', { onRequest: [ authMiddleware ] }, errorHandler(listOrders));
    app.put('/:id/cancel', { onRequest: [ authMiddleware ] }, errorHandler(cancelOrder));
    app.get('/:id', { onRequest: [ authMiddleware ] }, errorHandler(getOrderById));
}