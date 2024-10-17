import conf from '../conf/conf.js'
import {Client,Account,ID,Databases,Storage,Query} from 'appwrite'

export class DatabaseService{

    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createPost({title,slug,content,featuredImage,status,userId}){  //slug is document id
        try{
            return await this.databases.createDocument(    //what is need of "return"
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    slug,
                    content,featuredImage,
                    status,
                    userId,
                }
            
            )

        }catch(error){
            console.log("Appwrite service :: createPost :: error",error);
            
        };
    }

    async updatePost(slug,{title,content,featuredImage,status,userId}){
        try{
             return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
             )  

        }catch(error){
            console.log("Appwrite service :: updatePost :: error",error);
        }
    }

    async deletePost(slug){
            try {
               await this.databases.deleteDocument( //here,no "return" , why?
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
               )
               return true

            } catch (error) {
                console.log("Appwrite service :: deletePost :: error",error);
                return false;m
            }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries, //or without defining query in parameter, we can directly write --
                //  [Query.equal("status","active")]
            )
     } catch (error) {
            console.log("Appwrite service :: getPosts :: error",error);
            return false
        }
    }

    // file upload services  --- it will contain featured image info. , from this,we will give value to featuredImage in createPost fn
    async uploadFile(file){
       try {
         return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
         ) 
        
       } catch (error) {
        console.log("Appwrite service :: upload_File :: error",error);
        return false
       }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
          return true;  
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);
            return false;
        }
    }

    getFilePreview(fileId){ //-----> image will be seen small in size
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}    

const databaseService = new DatabaseService();

export default databaseService;