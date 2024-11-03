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

## Technologies 🛠️

- TypeScript
- Fastify
- Prisma
- PostgreSQL
- Zod

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

## Endpoints
