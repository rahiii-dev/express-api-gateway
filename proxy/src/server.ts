import { ServiceError } from "@grpc/grpc-js";
import userServiceClient from "./clients/userClient";

const getUsers = () => {
    userServiceClient.GetUsers({}, (error: ServiceError | null, response: any) => {
        if (error) {
            console.log({
                message: "Error retrieving users from gRPC service",
                error,
              });
            return
          }
          
          console.log(response);
          
    })
}

getUsers();
console.log("ok");

