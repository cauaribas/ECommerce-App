import { z } from "zod";

export const ChangeStatusSchema = z.object({
    status: z.enum(["ACCEPTED", "OUT_FOR_DELIVERY", "DELIVERED", "PENDING"]),
});