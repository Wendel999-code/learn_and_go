import { useMutation } from "@tanstack/react-query";
import api from "../axios/axios";

interface SignupData {
  email: string;
  password: string;
  name?: string;
}

interface SignupResponse {
  message: string;
  userId: string;
}

export const useSignup = () => {
  return useMutation<SignupResponse, any, SignupData>(
    async (data: SignupData) => {
      const res = await api.post("/auth/signup", data);
      return res.data;
    }
  );
};
