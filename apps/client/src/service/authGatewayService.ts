import { gatewayClient } from './gatewayClient';
import { UserResponse, SignUpPayload, LoginPayload } from '../types/api.type';

const authGatewayService = {
  // sign in new user 
  async postSignupUser(payload: SignUpPayload): Promise<UserResponse> {
    if (!payload) throw new Error('No details provided');
    const response = await gatewayClient.post('/users/signup', payload);
    return response.data;
  },

  // login new user 
  async postLoginUser(payload: LoginPayload): Promise<UserResponse> {
    if (!payload) throw new Error('No details provided');
    const response = await gatewayClient.post('/users/login', payload);
    return response.data;
  },
};

export default authGatewayService;
