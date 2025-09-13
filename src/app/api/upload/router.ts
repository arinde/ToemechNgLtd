import type { NextApiRequest, NextApiResponse } from "next";
import { cloudinary } from "@/lib/cloudinary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { file } = req.body as { file: string };

    if (!file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const uploadedResponse = await cloudinary.uploader.upload(file, {
      folder: "toemech-projects", // optional folder
    });

    return res.status(200).json({ url: uploadedResponse.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return res.status(500).json({ message: "Upload failed" });
  }
}
