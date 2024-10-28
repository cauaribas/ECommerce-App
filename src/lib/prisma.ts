import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
    log: ["query"],
}).$extends({
    result: {
        address: {
            formattedAddress: {
                needs: {
                    lineOne: true,
                    lineTwo: true,
                    city: true, 
                    country: true,
                    pincode: true
                },
                compute: (address) => {
                    return `${address.lineOne}, ${address.lineTwo}, ${address.city}, ${address.country}, ${address.pincode}`;
                }
            }
        }
    }
});
