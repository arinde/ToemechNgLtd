"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";

interface UploadResponse {
  secure_url: string;
}

interface UploadProps {
  onUploadSuccess?: (url: string) => void; // 🔹 callback to parent
}

const Upload: React.FC<UploadProps> = ({ onUploadSuccess }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setUploadedUrl(null);
      setProgress(0);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "toemech_uploads");

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.cloudinary.com/v1_1/ddinnivn2/image/upload");

      xhr.upload.onprogress = (event: ProgressEvent) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data: UploadResponse = JSON.parse(xhr.responseText);
          setUploadedUrl(data.secure_url);

          // 🔹 Send URL up to parent form
          if (onUploadSuccess) {
            onUploadSuccess(data.secure_url);
          }

          toast.success("✅ Image uploaded successfully!");
        } else {
          console.error("Upload failed:", xhr.responseText);
          toast.error("❌ Upload failed, try again.");
        }
        setLoading(false);
      };

      xhr.onerror = () => {
        console.error("Network error during upload");
        toast.error("⚠️ Network error during upload.");
        setLoading(false);
      };

      xhr.send(formData);
    } catch (error: unknown) {
      console.error("Unexpected error:", error);
      toast.error("⚠️ Unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* File input */}
      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md transition">
        Choose Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Preview */}
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          className=" object-cover rounded-lg shadow-md border"
          width={120}
          height={120}
          quality={100}
        />
      )}

      {/* Upload button */}
      {image && (
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-md transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      )}

      {/* Progress Bar */}
      {loading && (
        <div className="w-full max-w-xs bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full text-xs text-white text-center"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {/* Uploaded URL */}
      {uploadedUrl && (
        <p className="text-sm text-gray-600 break-all">
          ✅ Uploaded:{" "}
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View Image
          </a>
        </p>
      )}
    </div>
  );
};

export default Upload;
