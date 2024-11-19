# Express API Gateway

A simple project to learn and explore building an **API Gateway** using **Express.js**, with microservice communication via **REST APIs** and **gRPC**.

---

## Features

- Centralized **API Gateway** for microservices.
- Communication via:
  - **REST APIs**: Standard HTTP requests.
  - **gRPC**: High-performance binary communication.
- Separate branches for clear implementation examples.

---

## Branches

1. **Main**  
   - Basic project structure and README.  

2. **Simple**  
   - Microservices communicate using REST APIs.  

3. **gRPC**  
   - Microservices communicate using gRPC.  

---

## Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Docker** (optional, for containerized services)
- **gRPC Tools** (for the gRPC branch)

---

## Usage

### REST (Simple Branch)
1. Start the services:  
   ```bash
   npm run dev
   ```
2. Test a service via the gateway:  
   ```bash
   curl http://localhost:3000/api/users
   ```

### gRPC (gRPC Branch)
1. Start the gRPC services:  
   ```bash
   npm run dev
   ```
2. Use the client to call services (example in `grpc-client.js`):  
   ```bash
   node grpc-client.js
   ```

