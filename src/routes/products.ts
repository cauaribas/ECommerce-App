import { FastifyInstance } from "fastify";
import { errorHandler } from "../error-handler";
import { createProduct, deleteProduct, findAllProducts, findProductById, updateProduct } from "../controllers/products/products-controller";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";

export async function productsRoutes(app: FastifyInstance) {
    app.post('/products/', { onRequest: [ authMiddleware, adminMiddleware ] }, errorHandler(createProduct));
    app.get('/products/:id', { onRequest: [ authMiddleware, adminMiddleware ] }, errorHandler(findProductById));
    app.patch('/products/:id', { onRequest: [ authMiddleware, adminMiddleware ] }, errorHandler(updateProduct));
    app.delete('/products/:id', { onRequest: [ authMiddleware, adminMiddleware ] }, errorHandler(deleteProduct));
    app.delete('/products/', { onRequest: [ authMiddleware, adminMiddleware ] }, errorHandler(findAllProducts));
}