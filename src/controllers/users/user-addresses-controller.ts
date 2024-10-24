import { FastifyReply, FastifyRequest } from "fastify";
import { AddressSchema, ParamsSchema } from "../../schema/users";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import { prisma } from "../../lib/prisma";
import { InternalException } from "../../exceptions/internal-exception";

export async function createAddress(request: FastifyRequest, reply: FastifyReply) {
    
    const addressData = AddressSchema.parse(request.body);

    try {
        const address = await prisma.address.create({
            data: {
                ...addressData,
                userId: request.user.id,
            }
        });

        reply.send(address);

    } catch (error) {
        throw new InternalException("Failed to create address", error, ErrorCode.INTERNAL_EXCEPTION);
    }
}

export async function updateAddress(request: FastifyRequest, reply: FastifyReply) {

}

export async function deleteAddress(request: FastifyRequest, reply: FastifyReply) {
    
    const { id } = ParamsSchema.parse(request.params);
    
    try {
        await prisma.address.delete({
            where: {
                userId: request.user.id,
                id: parseInt(id as any),
            }
        });

        reply.send({message: "Address deleted successfully"});

    } catch (error) {
        throw new NotFoundException("Failed to delete address", error, ErrorCode.ADDRESS_NOT_FOUND);
    }
}

export async function getAddresses(request: FastifyRequest, reply: FastifyReply) {
    try {
        const addresses = await prisma.address.findMany({
            where: {
                userId: request.user.id,
            }
        });

        reply.send(addresses);
    } catch (error) {
        throw new InternalException("Failed to fetch addresses", error, ErrorCode.ADDRESS_NOT_FOUND); 
    }
}