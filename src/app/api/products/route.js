import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
import {unlink} from 'fs/promises';
import cloudinary from "@/lib/cloudinary";
import {processImage} from '@/lib/processImage'

export async function GET(){
    try {
        const results = await conn.query("SELECT * FROM product")
    return NextResponse.json(results);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        )
    }
}

export async function POST(request) {
    try {
      const data = await request.formData();
      const image = data.get("image")

      if(!data.get("name")){
        return NextResponse.json({
            message: "Name is Required",
        },
        {
            status: 400
        }
        )
      }

      if(!image){
        return NextResponse.json({
            message: "Image is Required",
        },
        {
            status: 400
        }
        )
      }

      const filePath = await processImage(image)

      const res = await cloudinary.uploader.upload(filePath)
console.log(res)

      if(res) {
        await unlink(filePath);
      }

      const result = await conn.query("INSERT INTO product SET ?", {
        name: data.get("name"),
        description: data.get("description"),
        price: data.get("price"),
        image: res.secure_url,
      });

      return NextResponse.json({
        name: data.get("name"),
        description: data.get("description"),
        price: data.get("price"),
        id: result.insertId,
      });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
        {
            message: error.message
        },
        {
            status: 500,
        }
        )
    }
}