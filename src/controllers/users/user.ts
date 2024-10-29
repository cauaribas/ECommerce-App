import { FastifyReply, FastifyRequest } from "fastify";
import { ChangeUserRoleSchema, ListUsersParamsSchema, ParamsSchema, updateUsersSchema } from "../../schema/users";
import { Address } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import { BadRequestsException } from "../../exceptions/bad-resquests";

export async function updateUsers(request: FastifyRequest, reply: FastifyReply) {
    const validatedData = updateUsersSchema.parse(request.body);

    let shippingAddress: Address;

    let billingAddress: Address;

    if(validatedData.defaultShippingAddress) {
        try {
            shippingAddress = await prisma.address.findFirstOrThrow({
                where: {
                    id: validatedData.defaultShippingAddress
                }
            });

            if(shippingAddress.userId !== request.user.id) {
                throw new BadRequestsException('Shipping address does not belong to the user', ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER);
            }

        } catch (error) {
            throw new NotFoundException('Shipping address not found', ErrorCode.ADDRESS_NOT_FOUND, error);
        }
    }

    if(validatedData.defaultBillingAddress) {
        try {
            billingAddress = await prisma.address.findFirstOrThrow({
                where: {
                    id: validatedData.defaultBillingAddress
                }
            });
            
            if(billingAddress.userId !== request.user.id) {
                throw new BadRequestsException('Shipping address does not belong to the user', ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER);
            }

        } catch (error) {
            throw new NotFoundException('Billing address not found', ErrorCode.ADDRESS_NOT_FOUND, error);
        }
    }

    const updatedUser = await prisma.user.update({
        where: { 
            id: request.user.id
        }, 
        data: validatedData,
    });

    reply.send(updatedUser);
}

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { skip, take } = ListUsersParamsSchema.parse(request.query);

        const users = await prisma.user.findMany({
            skip: skip || 0,
            take: take || 5,
        });

        reply.send(users);
    } catch (error) {
        throw new NotFoundException('Users not found', ErrorCode.USER_NOT_FOUND, error);
    }
}

export async function getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = ParamsSchema.parse(request.params);

        const user = await prisma.user.findFirstOrThrow({
            where: {
                id
            },
            include: {
                addresses: true
            }
        });

        reply.send(user);
    } catch (error) {
        throw new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND, error);
    }
}

export async function changeUserRole(request: FastifyRequest, reply: FastifyReply) {
    try {

        const { id } = ParamsSchema.parse(request.params);
        
        const { role } = ChangeUserRoleSchema.parse(request.body);

        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                role
            }
        });

        reply.send(user);
    } catch (error) {
        throw new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND, error);
    }
}