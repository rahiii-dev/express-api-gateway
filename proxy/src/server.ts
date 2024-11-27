import { ServiceError } from "@grpc/grpc-js";
import userServiceClient from "./clients/userClient";

const getUsers = () => {
    userServiceClient.GetUsers({}, (error: ServiceError | null, response: any) => {
        if (error) {
            console.log({
                message: error.details,
              });
            return
          }
          
          console.log(response);
    })
}
const addUser = (data: {fullName: string, email: string, password: string}) => {
    userServiceClient.AddUser(data, (error: ServiceError | null, response: any) => {
        if (error) {
            console.log({
                message: error.details,
              });
            return
          }
          
          console.log(response);
    })
}

// getUsers();
// addUser({fullName: "Rahib", email: "rahitest@gmail.com", password:"123"})
getUsers()

