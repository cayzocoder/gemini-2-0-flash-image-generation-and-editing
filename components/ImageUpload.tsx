"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onError?: (message: string) => void;
}

export default function ImageUpload({ onImageSelect, onError }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections) => {
      if (fileRejections?.length > 0) {
        const error = fileRejections[0].errors[0];
        onError?.(error.message);
        return;
      }

      const file = acceptedFiles[0];
      if (file) {
        setIsLoading(true);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          setIsLoading(false);
        };
        reader.onerror = () => {
          onError?.("Error reading file. Please try again.");
          setIsLoading(false);
        };
        reader.readAsDataURL(file);

        onImageSelect(file);
      }
    },
    [onImageSelect, onError] // ✅ dependency to‘liq
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
        ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
      `}
    >
      <input {...getInputProps()} />
      {isLoading ? (
        <p className="text-gray-500">Loading preview...</p>
      ) : preview ? (
        <Image
          src={preview}
          alt="Uploaded preview"
          width={300}
          height={300}
          unoptimized
          className="mx-auto rounded-lg shadow-md"
        />
      ) : (
        <p className="text-gray-500">
          Drag & drop an image here, or click to select
        </p>
      )}
    </div>
  );
}

