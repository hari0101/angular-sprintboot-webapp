# Cybertron Backend

Backend service for the Cybertron application, built with Spring Boot.

## Prerequisites

- Java 17
- Maven

## Configuration

The application is configured to run on port **8081**.
This is defined in `src/main/resources/application.properties`.

## Running the Application

To run the application locally, use the following command:

```bash
mvn spring-boot:run
```

The service will start at `http://localhost:8081`.

## Features

- **Port Configuration**: Listening on 8081.
- **API Endpoints**: Serves data to the frontend (Chat, Health).
