# Ecommerce API

[![wakatime](https://wakatime.com/badge/user/34026f4b-1fa6-4a1b-8c38-68fcdab9eb63/project/fcc22814-64a7-451d-8fa7-30382078283d.svg)](https://wakatime.com/badge/user/34026f4b-1fa6-4a1b-8c38-68fcdab9eb63/project/fcc22814-64a7-451d-8fa7-30382078283d)

> \*\*Ecommerce API\*\* is a Node Rest Api designed to support an e-commerce application, providing endpoints for authentication, product management, user management, cart handling, and order processing.

## About 📖

This project was conducted for studies on REST APIs, developed in TypeScript, utilizing technologies like Fastify, to efficiently handle HTTP requests, and Prisma to simplify database interactions.

- Authenticate securely: Users can register and log in to access main features.
- Browse and manage products: Admins can create, update, and delete products, while all users can view products and search for items based on keywords.
- Manage user accounts: Retrieve user profiles, update user roles, and access account-related information.
- Handle user addresses: Users can add, update, and delete their delivery addresses.
- Manage shopping carts: Users can add items to their cart, view cart contents, update quantities, and remove items.
- Place and manage orders: Users can create orders from their cart, check the status of individual orders, and even cancel orders if necessary. Admins can also update order statuses.

## Technologies ⚙

- <a target="_blank" href="https://www.typescriptlang.org">TypeScript</a>
- <a target="_blank" href="https://fastify.dev">Fastify</a>
- <a target="_blank" href="https://www.prisma.io">Prisma</a>
- <a target="_blank" href="https://www.postgresql.org">PostgreSQL</a>
- <a target="_blank" href="https://zod.dev">Zod</a>

## How to run 🚀

- ### Prerequisites

  - Node.js
  - PostgreSQL

- ### 1. Clone the repository

```bash
    $ git clone https://github.com/cauaribas/ECommerce-App.git
```

- ### 2. Install project dependencies

```bash
    $ npm i
```

- ### 3. Rename .env.example to .env and set up your database URL and other environment variables.

- ### 4. Run migrations

```bash
    npx prisma migrate dev
```

- ### 5. Run the server

```bash
    npm run dev
```

## Endpoints 🚩

### Authentication 🔒

| Endpoint            | Description         |
| ------------------- | ------------------- |
| `POST /auth/signup` | Register a new user |
| `POST /auth/login`  | Login a user        |

### Products 🛍️

| Endpoint                         | Description                            |
| -------------------------------- | -------------------------------------- |
| `POST /products`                 | Create a new product                   |
| `GET /products/:id`              | Retrieve details of a specific product |
| `GET /products`                  | Retrieve a list of all products        |
| `GET /products/search?q=<query>` | Search products based on a query       |
| `PATCH /products/:id`            | Update a product by ID                 |
| `DELETE /products/:id`           | Delete a product by ID                 |

### Users 👤

| Endpoint              | Description                        |
| --------------------- | ---------------------------------- |
| `GET /users`          | Get all users                      |
| `GET /users/:id`      | Retrieve a specific user's details |
| `PUT /users/:id/role` | Update a user's role               |

### User Address 🏠

| Endpoint                    | Description                     |
| --------------------------- | ------------------------------- |
| `POST /users/address`       | Add a new address for the user  |
| `GET /users/address`        | Get all addresses for the user  |
| `PUT /users/address`        | Update an address for the user  |
| `DELETE /users/address/:id` | Delete a specific address by ID |

### Cart 🛒

| Endpoint           | Description                        |
| ------------------ | ---------------------------------- |
| `POST /cart`       | Add items to the cart              |
| `GET /cart`        | Get the user's cart                |
| `PUT /cart/`       | Update a specific item in the cart |
| `DELETE /cart/:id` | Remove an item from the cart       |

### Order 📦

| Endpoint                            | Description                             |
| ----------------------------------- | --------------------------------------- |
| `POST /orders`                      | Place a new order                       |
| `GET /orders`                       | Retrieve all orders                     |
| `GET /orders/:id`                   | Get details of a specific order         |
| `GET /orders/index?status=<status>` | Retrieve orders filtered by status      |
| `GET /orders/users`                 | Get all orders made by the current user |
| `PUT /orders/:id/status`            | Update the status of a specific order   |
| `PUT /orders/:id/cancel`            | Cancel an order                         |

---

## 📃 License

The project is under the license [MIT license](./LICENSE).
