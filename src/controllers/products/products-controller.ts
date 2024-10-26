import { Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { RegisterProductSchema, UpdateProductSchema } from "../../schema/products";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import { QueryParamsSchema, ParamsSchema } from "../../schema/products";

export async function createProduct(request: FastifyRequest, reply: FastifyReply){
    
    const { name, description, price, tags } = RegisterProductSchema.parse(request.body);

    const product = await prisma.product.create({
        
        // ["coffe", "tea", "juice"] => "coffe,tea,juice"
        // Create a validator for this request
        data: {
            name,
            description,
            price,
            tags: tags.join(","),
        }
    });
    
    reply.send(product);
}

export async function getProductById(request: FastifyRequest, reply: FastifyReply){
    try {
        const { id: productId } = ParamsSchema.parse(request.params); 

        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        });
        reply.send(product);
    } catch (error) {
        throw new NotFoundException("Product Not Found", ErrorCode.NOT_FOUND, 404);
    }
}

export async function updateProduct(request: FastifyRequest, reply: FastifyReply){
    try {
        const product = UpdateProductSchema.parse(request.body);

        const { id: productId } = ParamsSchema.parse(request.params); 

        if(product.tags) {
            product.tags = [(product.tags as string[]).join(",")];
        }

        const updatedProduct = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                ...product,
                tags: product?.tags ? product.tags.join(",") : undefined,
            },
        });

        reply.send(updatedProduct);
    } catch (error) {
        throw new NotFoundException("Product Not Found", ErrorCode.NOT_FOUND, 404);
    }
}

export async function deleteProduct(request: FastifyRequest, reply: FastifyReply){
    try {
        const { id: productId } = ParamsSchema.parse(request.params); 

        await prisma.product.delete({
            where: {
                id: productId
            }
        });

        reply.send({ message: "Product Deleted Successfully" });
    } catch (error) {
        throw new NotFoundException("Product Not Found", ErrorCode.NOT_FOUND, 404);
    }
}

export async function fetchAllProducts(request: FastifyRequest, reply: FastifyReply){
    try {
        const { page = 1, pageSize = 10, orderBy = "asc" } = QueryParamsSchema.parse(request.query);

        if (page < 1 || pageSize < 1) {
            reply.status(400).send({ message: "Page and pageSize must be positive integers" });
            return;
        }

        const skip = (page - 1) * pageSize;

        let orderDirection: Prisma.SortOrder = "asc";

        if(orderBy === "desc") orderDirection = "desc";

        const products = await prisma.product.findMany({
            skip: skip,
            take: parseInt(pageSize as any),
            orderBy: {
                name: orderDirection
            },
        });

        reply.send(products);
    } catch (error) {
        throw new NotFoundException("Products Not Found", ErrorCode.NOT_FOUND, 404);
    }
}