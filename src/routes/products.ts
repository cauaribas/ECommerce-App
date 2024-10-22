import { FastifyInstance } from "fastify";
import { errorHandler } from "../error-handler";
import { createProduct, deleteProduct, fetchAllProducts, getProductById, updateProduct } from "../controllers/products/products-controller";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";

export async function productsRoutes(app: FastifyInstance) {
    app.post('/products', { onRequest: [ authMiddleware, adminMiddleware ] }, errorHandler(createProduct));
    app.get('/products/:id', { onRequest: [ authMiddleware, adminMiddleware ] }, errorHandler(getProductById));
    app.patch('/products/:id', { onRequest: [ authMiddleware, adminMiddleware ] }, errorHandler(updateProduct));
    app.delete('/products/:id', { onRequest: [ authMiddleware, adminMiddleware ] }, errorHandler(deleteProduct));
    app.get('/products', { onRequest: [ authMiddleware, adminMiddleware ] }, errorHandler(fetchAllProducts));
}