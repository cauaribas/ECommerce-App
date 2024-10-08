import { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prisma } from "../lib/prisma";

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    // 1. Extrair o token do cabeçalho
    const authHeader = request.headers.authorization; 
    
    if (!authHeader) throw new UnauthorizedException("Authorization header not found", ErrorCode.UNAUTHORIZED);
    
    const token = authHeader.replace('Bearer ', '');

    // 2. Verificar se o token está presente, caso contrário lançar erro
    if (!token) { 
        throw new UnauthorizedException("Token not found", ErrorCode.UNAUTHORIZED);
    }

    try {
        // 3. Verificar o token e extrair o payload
        const payload = jwt.verify(token, JWT_SECRET) as any; // fix: adicione o tipo adequado ao payload

        // 4. Buscar o usuário usando o payload
        const user = await prisma.user.findFirst({
            where: {
                id: payload.userId
            }
        });

        if (!user) {
            throw new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED);
        }
        
        // 5. Anexar o usuário ao objeto request
        request.user = user;
        
    } catch (error) {
        throw new UnauthorizedException("Invalid token", ErrorCode.UNAUTHORIZED);
    }
};
