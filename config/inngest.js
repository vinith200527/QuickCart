import { Inngest} from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quikcart-next" });


export const syncUserCreation =inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {
        event:'clerk/user.created'
    },
    async({event})=>{
        const {id,first_name,last_name,email_addresses,image_url}=event.data
        const userData={
            _id:id,
            email:email_addresses[0].email_addresses,
            name:first_name +''+ last_name,
            imageUrl:image_url

        }
        await connectDB()
        await User.create(userData)
        console.error( event.data);

    }
)



//Ingest Function to update user ddata in database


export const syncUserUpdation =inngest.createFunction(
    {
        id:'Update-user-from-clerk'
    },
    {
        event:'clerk/user.updated'
    },
    async({event})=>{
        const {id,first_name,last_name,email_addresses,image_url}=event.data
        const userData={
            _id:id,
            email:email_addresses[0].email_addresses,
            name:first_name+''+last_name,
            image_url:image_url

        }
        await connectDB()
        await User.findByIdAndUpdate(id,userData)


    }
)

// Inngesst functon to delete useer from database

export const syncUserDeletion = inngest.createFunction(
    {
        id:'delete-user-with-clerk'
    },{
        event:'clerk/user.deleted'
    },
    async({event})=>{
        const {id}=event.data
        await connectDB()
        await User.findByIdAndDelete(id)

    }
  

)