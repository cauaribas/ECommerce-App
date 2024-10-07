import { FastifyInstance } from 'fastify';
import { signup, login } from '../controllers/users/auth-controller';

export async function authRoutes(app: FastifyInstance) {
    app.post('/signup', signup);
    app.post('/login', login);
}