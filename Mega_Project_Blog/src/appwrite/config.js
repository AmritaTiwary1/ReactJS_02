// import conf from '../conf/conf.js'
// import {Client,Account,ID,Databases,Storage,Query} from 'appwrite'

// export class DatabaseService{

//     client = new Client();
//     databases;
//     bucket;

//     constructor(){
//         this.client.setEndpoint(conf.appwriteUrl)
//         .setProject(conf.appwriteProjectId);

//         this.databases = new Databases(this.client);
//         this.bucket = new Storage(this.client);

//     }

//     //fn related to Document in database takes parameters like - appwriteDatabaseId , collectionId , slug(particular id) and .......

//     async createPost({title,slug,content,featuredImage,status,userId}){  //slug is document id ,featured img dont contain real img,it is url/id, real img is stored in storage/bucket of appwrite, createPost is fn which we have made in which we are taking title,content,featured_img,etc. and then calling a fn of appwrite -createdocument
//         try{
//             return await this.databases.createDocument(    //what is need of "return"
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug,
//                 {
//                     title,
//                     slug,
//                     content,featuredImage,
//                     status,
//                     userId,
//                 }
            
//             )

//         }catch(error){
//             console.log("Appwrite service :: createPost :: error",error);
            
//         };
//     }

//     async updatePost(slug,{title,content,featuredImage,status,userId}){ //updatePost take parameter where slug(id) is taken & the new value(replaced) is also taken, and in database,when slug is matched with document_id , then the value inside that document get replaced with the new one
//         try{
//              return await this.databases.updateDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug,
//                 {
//                     title,
//                     content,
//                     featuredImage,
//                     status
//                 }
//              )  

//         }catch(error){
//             console.log("Appwrite service :: updatePost :: error",error);
//         }
//     }

//     async deletePost(slug){
//             try {
//                await this.databases.deleteDocument( //here,no "return" , why?
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug
//                )
//                return true

//             } catch (error) {
//                 console.log("Appwrite service :: deletePost :: error",error);
//                 return false;
//             }
//     }

//     async getPost(slug){
//         try {
//             return await this.databases.getDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug
//             )
            
//         } catch (error) {
//             console.log("Appwrite service :: getPost :: error",error);
//             return false;
//         }
//     }

//     async getPosts(queries = [Query.equal("status","active")]){ //we can define variable in parameter section too
//         try {
//             return await this.databases.listDocuments(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 queries, //or if we dont write query her,then without defining query in parameter, we can directly write --
//                 //  [Query.equal("status","active")]
          
//                 //query.limit(20)----we can even control how much document we want (100,200,10,20...etc)
//             )
//      } catch (error) {
//             console.log("Appwrite service :: getPosts :: error",error);
//             return false
//         }
//     }

//     // file upload services  --- it will contain featured image info. , from this,we will give value to featuredImage in createPost fn
//     async uploadFile(file){
//        try {
//          return await this.bucket.createFile(    // bucket is storage of appwrite, all the text content is stored in database ,but the file content(img) use storage of appwrite
//             conf.appwriteBucketId,
//             ID.unique(),
//             file
//          ) 
        
//        } catch (error) {
//         console.log("Appwrite service :: upload_File :: error",error);
//         return false
//        }
//     }

//     async deleteFile(fileId){
//         try {
//             await this.bucket.deleteFile(
//                 conf.appwriteBucketId,
//                 fileId
//             )
//           return true;  
//         } catch (error) {
//             console.log("Appwrite service :: deleteFile :: error",error);
//             return false;
//         }
//     }

//     getFilePreview(fileId){ //-----> image will be seen small in size , this fn is provided by appwrite
//         return this.bucket.getFilePreview(
//             conf.appwriteBucketId,
//             fileId
//         )
//     }

// }    

// const databaseService = new DatabaseService();

// export default databaseService;

import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
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
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()
export default service