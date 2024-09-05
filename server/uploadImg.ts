'use server'

import { actionClient } from "@/lib/safeAction";
import { UploadApiResponse, v2 as cloudinary} from "cloudinary";
import z, { never, string } from "zod"

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_KEY,
    api_secret : process.env.CLOUDINARY_SECRET,
})

const formData = z.object({ //defining schema of formData
    image : z.instanceof(FormData), // as image is appended in key value pair
})

export const uploadImage = actionClient.schema(formData).action(async (
    {parsedInput : { image }}) => {
        const formImage = image.get("image")
        if (!image) return  {error : "No image found"}
        if (!formImage) return  {error : "No image found"}
        
        const file = formImage as File
        
        type UploadResult = 
        { success : UploadApiResponse; error?: never }//if success then error never type
        { error  : string; success : never}//if error then success never type

        try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            return new Promise<UploadResult>((resolve, reject) => {
                const uplodStream = cloudinary.uploader.upload_stream(
                    {
                        upload_preset : process.env.CLOUDINARY_NAME,
                    },
                    (error, result) => { //callback
                        if (error || !result) {
                            reject({error : "Upload Failed"})
                        }else{
                            resolve ({ success : result })
                        }
                    }
                )
            })
        }catch(err){
            return { error : err }
        }
    }

)







