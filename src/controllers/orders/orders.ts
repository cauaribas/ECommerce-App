import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../lib/prisma";
import { ListUsersParamsSchema, ParamsSchema } from "../../schema/users";
import { NotFoundException } from "../../exceptions/not-found";
import { ErrorCode } from "../../exceptions/root";
import { ChangeStatusSchema, ListUserOrdersSchema } from "../../schema/orders";

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

export async function changeStatus(request: FastifyRequest, reply: FastifyReply) {
    // 1. wrap it in a transaction
    try {
        const { id } = ParamsSchema.parse(request.params);
        
        const { status } = ChangeStatusSchema.parse(request.body);

        const order = await prisma.order.update({
            where: {
                id,
            },
            data: {
                status,
            }
        });

        await prisma.orderEvent.create({
            data: {
                orderId: order.id,
                status,
            }
        });

        reply.send(order);
    } catch (error) {
        throw new Error("Failed to change order status");
    }
}

export async function getOrderById(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = ParamsSchema.parse(request.params);

        const order = await prisma.order.findFirst({
            where: {
                id,
            }
        });

        reply.send(order);
    } catch (error) {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND, error);
    }
}

export async function listAllOrders(request: FastifyRequest, reply: FastifyReply) {
    
    const status = (request.query as any).status; // add typings
    
    const { skip, take } = ListUsersParamsSchema.parse(request.query);
    
    let whereClause = {};

    if(status) {
        whereClause = {
            status,
        }
    }

    const orders = await prisma.order.findMany({
        where: whereClause,
        skip: skip || 0,
        take: take || 5,
    });

    reply.send(orders);
}

export async function listUsersOrders(request: FastifyRequest, reply: FastifyReply) {
    const status = (request.query as any).status;
    
    const { skip, take } = ListUsersParamsSchema.parse(request.query);
    
    let whereClause: any = {
        userId: (request.params as any).id,
    };

    if(status) {
        whereClause = {
            ...whereClause,
            status,
        }
    }

    const orders = await prisma.order.findMany({
        where: whereClause,
        skip: skip || 0,
        take: take || 5,
    });

    reply.send(orders);
}