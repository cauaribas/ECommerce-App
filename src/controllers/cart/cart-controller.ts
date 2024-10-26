import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCartSchema } from "../../schema/cart";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import { Product } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export async function addItemToCart(request: FastifyRequest, reply: FastifyReply) {
    const validatedData = CreateCartSchema.parse(request.body);

    let product: Product;

    try {
        await prisma.product.findUnique({
            where: {
                id: validatedData.productId
            }
        });
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