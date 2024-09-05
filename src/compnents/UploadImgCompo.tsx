"use client"

import {useDropzone} from "react-dropzone"
import { uploadImage } from "../../server/uploadImg";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function UploadImage(){
   const {getRootProps, getInputProps, isDragActive} = useDropzone({
    maxFiles : 1,
    accept  : {
        "image/png" : [".png"],
        "image/jpg" : [".jpg"],
        "image/webp" : [".webp"],
        "image/jpeg" : [".jpeg"]
    },
    onDrop : async (acceptFiles, fileRejections) => {
        if (acceptFiles.length) {
            const formData = new FormData();
            formData.append("image", acceptFiles[0]);
            const objectUrl = URL.createObjectURL(acceptFiles[0]);
            const res = await uploadImage({ image : formData })
            console.log("response", res)
        }
    }
   })

    return(
        <Card 
            className={cn(
                "bg-white border-2 border-slate-50",
                "hover:cursor-pointer hover:animate-pulse hover:bg-slate-50 w-full h-80 ",
                "hover:border-slate-100 hover:border-1"
                ,`${isDragActive ? "animate-wiggle" : ""}`
            )}
            {...getRootProps()}
        >
            <CardContent className="">
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-4 h-60">
                    <p className="text-slate-500 text-muted-foreground text-4xl">{isDragActive ? "Drop your image here" : "Start by uploading the image"}</p>
                    <p className="text-muted-foreground text-xl">Supporting files are .png , .jpg , .webp , .jpeg</p> 
                </div>
            </CardContent>
        </Card>

    )
}

// Note :- getRootProps and getInputProps are simply paramaters