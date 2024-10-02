import { axiosRequest } from "@/utils/axios";

export class LoginService {
  _request = axiosRequest
  

  async login(email: string) {
    const response =  await axiosRequest.post("/users/authorize", {
      email,
    });

    return response.data;
  }

  async createUser(email: string, name: string) {
    const response =  await axiosRequest.post("/users", {
      email,
      name
    });
    console.log(response)

    return response.data;
  }
}