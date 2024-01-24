<h1 align="center">NestJS Boilerplate</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="65" alt="Nest Logo" />
  </a>
</p>

## Description

[NestJS](https://github.com/nestjs/nest) Boilerplate is a project based on the boilerplate projects provided by NestJS, enhanced with authentication using Keycloak auth server.

## Getting Started

### Running Outside Docker Containers

1. Create a .env file by copying the example: `cp .env.example .env` and replace the existing environment variables.
2. Install dependencies: `npm install`
3. Start the app: `npm start` (the app will be exposed through port 3000)

### Running Inside Docker Containers

Note: The Dockerfile and docker-compose are not ready. To use, the init file needs to be configured before running:

```bash
$ ./init
```

## TypeORM integrated

This project is configured with [TypeORM](http://typeorm.io/) for PostgreSQL, though no entities have been created yet.

Migrations
No entities or migrations have been implemented in this project.
Snake_case naming convention is used for creating tables and columns.

## Environment Configuration

Integrated Configuration Module so you can just inject `ConfigService`
and read all environment variables from `.env` file, which is created automatically by the init script from `.env.example`.

## Swagger

RESTful APIs you can describe with already integrated Swagger.
To see all available endpoints visit http://localhost/api/docs

## Authentication - Keycloak

JWT authentication is preconfigured. Obtain the access token from the Keycloak endpoint to include in your requests.

## Microservices Best Practices

The project emphasizes several key aspects crucial for the structure of microservices:

1. **Maintaining Clean Code:** Prioritizing the use of best practices and design principles to ensure code cleanliness and readability.

2. **Proper HTTP Method and Status Code Usage:** Adhering to appropriate HTTP methods for effective communication between services.

3. **Clear Error Messages:** Ensuring error messages are clear and follow the defined error handling pattern in the application. This involves using the `ApiRuntimeException` class, creating exception classes that extend `ApiRuntimeException`, and incorporating the `ApiErrorDTO` class to provide detailed error information.

4. **Swagger Configuration:** Properly configuring Swagger for documenting and visualizing RESTful APIs.

5. **Structured Parameters and Returns:** All parameters and return values should have a representative class, avoiding the use of the `any` type.

6. **Module-specific DTO/Wrapper:** Each module should have its own DTO/Wrapper to facilitate interactions with other modules.