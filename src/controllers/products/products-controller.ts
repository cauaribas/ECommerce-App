import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { RegisterServiceRequest } from "../../service/products/register-service";
import { RegisterProductSchema, UpdateProductSchema } from "../../schema/products";
import { UpdateServiceRequest } from "../../service/products/update-service";

export async function createProduct(request: FastifyRequest<{ Body: RegisterServiceRequest }>, reply: FastifyReply){
    
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

export async function findProductById(request: FastifyRequest, reply: FastifyReply){
    
}

export async function updateProduct(request: FastifyRequest<{ Params: { id: number }, Body: UpdateServiceRequest }>, reply: FastifyReply){
    try {
        const product = UpdateProductSchema.parse(request.body);

        const productId = Number(request.params.id); // fix: maybe fix...

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
        reply.status(400).send({ error: "Invalid product data", details: error }); // add: not-found exception
    }
}

export async function deleteProduct(request: FastifyRequest, reply: FastifyReply){

}

export async function findAllProducts(request: FastifyRequest, reply: FastifyReply){
    
}