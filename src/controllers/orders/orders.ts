import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { ParamsSchema } from "../../schema/users";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";

export async function createOrder(request: FastifyRequest, reply: FastifyReply) {
    // 1. Create a transaction
    // 2. List all the cart items and proceed if cart is not empty
    // 3. calculate the total amount
    // 4. fetch the user's address
    // 5. to define computed field for formatted address on address module
    // 6. create order and order products
    // 7. create event for order created
    // 8. empty the cart
    try {
        return await prisma.$transaction(async (tx) => {
            const cartItems = await tx.cartItem.findMany({
                where: {
                    userId: request.user.id,
                },
                include: {
                    product: true,
                }
            });
    
            if (cartItems.length === 0) {
                return reply.status(400).send({message: "Cart is empty"});
            }
    
            const price = cartItems.reduce((prev, current) => {
                return prev + (current.quantity * Number(current.product.price));
            }, 0);
    
            if(!request.user.defaultShippingAddress) {
                return reply.status(400).send({message: "Please set a default shipping address"});
            }
    
            const address = await tx.address.findFirst({
                where: {
                    id: request.user.defaultShippingAddress,
                }
            });
    
            if (!address) {
                return reply.status(400).send({message: "Invalid shipping address"});
            }
    
            const order = await tx.order.create({
                data: {
                    userId: request.user.id,
                    netAmount: price,
                    address: address.formattedAddress,
                    products: {
                        create: cartItems.map((item) => {
                            return {
                                productId: item.productId,
                                quantity: item.quantity,
                            }
                        })
                    }
                }
            });
    
            const orderEvent = await tx.orderEvent.create({
                data: {
                    orderId: order.id,
                }
            });
    
            tx.cartItem.deleteMany({
                where: {
                    userId: request.user.id,
                }
            });
    
            return reply.send(order);
        });   
    } catch (error) {
        throw new Error("Failed to create order");
    }
}

export async function listOrders(request: FastifyRequest, reply: FastifyReply) {
    try {

        const orders = await prisma.order.findMany({
            where: {
                userId: request.user.id,
        }
        });

        reply.send(orders);
    } catch (error) {
        throw new Error("Failed to list orders");
    }
}

export async function cancelOrder(request: FastifyRequest, reply: FastifyReply) {
    
    // 1. wrap it in a transaction
    // 2. check if the user is cancelling his own order
    try {
        return await prisma.$transaction(async (tx) => {
            const { id } = ParamsSchema.parse(request.params);

            const order = await tx.order.update({
                where: {
                    id,
                    userId: request.user.id,
                },
                data: {
                    status: "CANCELLED",
                }
            });

            await tx.orderEvent.create({
                data: {
                    orderId: order.id,
                    status: "CANCELLED",
                }
            });

            reply.send(order);
        });
    } catch (error) {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND, error);
    }
}

export async function getOrderById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = ParamsSchema.parse(request.params);

        const order = await prisma.order.findFirst({
            where: {
                id,
                userId: request.user.id,
            }
        });

        reply.send(order);
    } catch (error) {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND, error);
    }
}