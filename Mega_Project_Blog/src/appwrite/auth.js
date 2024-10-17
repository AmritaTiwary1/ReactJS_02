import conf from "../conf/conf.js";
import {Client,Account,ID} from "appwrite"; //we are going to use the methods of client and account

export class AuthService {
 client = new Client();
    account;

    constructor(){
       this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
      try{
        const userAccount = await this.account.create(ID.unique(),email,password,name);     
       if (userAccount) {
            // if user account created successfully, then allow user to log in inside website
          return this.login({email,password})
       }
         else{
            return userAccount;
         }    }
        catch(error){
         throw error;
         console.log("Appwrite service :: createAccount :: error");
      }
    }

  async login({email,password}){
        try{
          return await this.account.createEmailPasswordSession(email,password);
        } catch(error){
            throw error;
            console.log("Appwrite service :: login :: error");
        }
     }
        async getCurrentUser(){
        try{
                return await this.account.get(); 
        }  catch(error){
            throw error;
            console.log("Appwrite service :: getcurrentUser :: error");
     }
     return null;
     }

async logout(){
        try{
              await this.account.deleteSessions();
     } catch(error){
        console.log("Appwrite service :: logout ::error ",error);
        
     }}}

     
const authService = new AuthService();  
export default authService;


