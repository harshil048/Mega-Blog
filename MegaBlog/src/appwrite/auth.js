import confg from '../confg/confg';
import { Client, Account, ID } from "appwrite";

export class AuthService {

  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(confg.appwriteUrl)
      .setProject(confg.appwriteProjectId);
    
      this.account = new Account(this.client);
  }

  async createAccount({email, password, name}) {
    try{
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if(userAccount) {
        return this.login({email, password});
      }
      return userAccount;
    }
    catch (error) {
      throw error;
    }
  }

  async login({email, password}) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authservice = new AuthService();

export default authservice;