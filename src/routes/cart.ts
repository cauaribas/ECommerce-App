import { FastifyInstance } from 'fastify';
import { errorHandler } from '../error-handler';
import { authMiddleware } from '../middlewares/auth';
import { addItemToCart, changeQuantity, deleteItemFromCart, getCart } from '../controllers/cart/cart-controller';

export async function cartRoutes(app: FastifyInstance) {
    app.post('/', { onRequest: [ authMiddleware ] }, errorHandler(addItemToCart));
    app.delete('/:id', { onRequest: [ authMiddleware ] }, errorHandler(deleteItemFromCart));
    app.put('/', { onRequest: [ authMiddleware ] }, errorHandler(changeQuantity));
    app.get('/', { onRequest: [ authMiddleware ] }, errorHandler(getCart));
}