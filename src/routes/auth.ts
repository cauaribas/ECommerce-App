import { FastifyInstance } from 'fastify';
import { signup, login } from '../controllers/users/auth-controller';
import { errorHandler } from '../error-handler';

export async function authRoutes(app: FastifyInstance) {
    app.post('/signup', errorHandler(signup));
    app.post('/login', errorHandler(login));
}