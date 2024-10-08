export interface RegisterServiceRequest {
    name: string;
    description: string;
    price: number;
    tags: string;
}

// model Product {
//     id          Int      @id @default(autoincrement())
//     name        String
//     description String
//     price       Decimal
//     tags        String
//     createdAt   DateTime @default(now())
//     updatedAt   DateTime @updatedAt
  
//     @@map("products")
// }