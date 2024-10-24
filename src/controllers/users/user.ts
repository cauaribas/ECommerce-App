import { FastifyReply, FastifyRequest } from "fastify";
import { updateUsersSchema } from "../../schema/users";
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
            throw new NotFoundException('Shipping address not found', null, ErrorCode.ADDRESS_NOT_FOUND);
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
            throw new NotFoundException('Billing address not found', null, ErrorCode.ADDRESS_NOT_FOUND);
        }
    }

    const updateUser = await prisma.user.update({
        where: { 
            id: request.user.id
        }, 
        data: validatedData,
    });

    reply.send(updateUser);
}
