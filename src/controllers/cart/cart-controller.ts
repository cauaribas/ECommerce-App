import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCartSchema } from "../../schema/cart";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import { Product } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export async function addItemToCart(request: FastifyRequest, reply: FastifyReply) {
    const { productId, quantity } = CreateCartSchema.parse(request.body);

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        });

        if (!product) {
            throw new NotFoundException("Product not found", null, ErrorCode.PRODUCT_NOT_FOUND);
        }

        const cart = await prisma.cartItems.create({
            data: {
                userId: request.user.id,
                productId: product.id,
                quantity,
            }
        });
        reply.send(cart);

    } catch (error) {
        throw new NotFoundException("Failed to add item to cart", error ,ErrorCode.PRODUCT_NOT_FOUND);
    }
}

export async function deleteItemFromCart(request: FastifyRequest, reply: FastifyReply) {
    
}

export async function changeQuantity(request: FastifyRequest, reply: FastifyReply) {
    
}

export async function getCart(request: FastifyRequest, reply: FastifyReply) {
    
}