import { FastifyInstance } from 'fastify';
import { signup, login, me } from '../controllers/users/auth-controller';
import { errorHandler } from '../error-handler';
import { authMiddleware } from '../middlewares/auth';

export async function authRoutes(app: FastifyInstance) {
    app.post('/signup', errorHandler(signup));
    app.post('/login', errorHandler(login));
    app.get('/me', { onRequest: [ authMiddleware ] }, errorHandler(me));
}