import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCartSchema, UpdateCartSchema } from "../../schema/cart";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import { prisma } from "../../lib/prisma";
import { ParamsSchema } from "../../schema/users";
import { ConflictException } from "../../exceptions/conflict-exception";

export async function addItemToCart(request: FastifyRequest, reply: FastifyReply) {
    const { productId, quantity } = CreateCartSchema.parse(request.body);

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        });

        if (!product) {
            throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);
        }

        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                userId: request.user.id,
                productId,
            },
        });

        if(existingCartItem) {
            throw new ConflictException("Product already in cart", ErrorCode.PRODUCT_ALREADY_IN_CART);
        }

        const cart = await prisma.cartItem.create({
            data: {
                userId: request.user.id,
                productId,
                quantity,
            }
        });
        reply.send(cart);

    } catch (error) {
        throw new NotFoundException("Failed to add item to cart", ErrorCode.PRODUCT_NOT_FOUND, error);
    }
}

export async function deleteItemFromCart(request: FastifyRequest, reply: FastifyReply) {
    const { id } = ParamsSchema.parse(request.params);
    
    try {
        await prisma.cartItem.delete({
            where: {
                userId: request.user.id,
                id,
            }
        });

        reply.send({success: true});
    } catch (error) {
        throw new NotFoundException("Failed to delete item from cart", ErrorCode.PRODUCT_NOT_FOUND, error);
    }
}

export async function changeQuantity(request: FastifyRequest, reply: FastifyReply) {
    const { id } = ParamsSchema.parse(request.params);
    
    const { quantity } = UpdateCartSchema.parse(request.body);

    try {
        const updatedCart = await prisma.cartItem.update({
            where: {
                userId: request.user.id,
                id,
            },
            data: {
                quantity,
            }
        });

        reply.send(updatedCart);
    } catch (error) {
        throw new NotFoundException("Failed to update cart item", ErrorCode.PRODUCT_NOT_FOUND, error);
    }
}

export async function getCart(request: FastifyRequest, reply: FastifyReply) {
    try {
        const cart = await prisma.cartItem.findMany({
            where: {
                userId: request.user.id
            }, 
            include: {
                product: true
            }
        });

        reply.send(cart);
    } catch (error) {
        throw new NotFoundException("Failed to get cart", ErrorCode.PRODUCT_NOT_FOUND, error);
    }
}