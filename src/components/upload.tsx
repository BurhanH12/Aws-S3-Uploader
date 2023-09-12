import React, { useEffect, useState } from 'react'
import { s3Client } from '@/utils/aws-config'

const Upload = () => {
    const [file, setFile] = useState<File | null >(null);
    const [uploading, setUploading] = useState<boolean | null >(false);
    const [uploadError, setUploadError] = useState<string | null >("");
    const [s3Url, setS3Url] = useState<string | null>("");

    const awsBucket = process.env.NEXT_PUBLIC_BUCKET_NAME;
    const allowedExtensions = [".html"];
    

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile: File = event.target.files?.[0];
        if (selectedFile) {
            const fileExtension = selectedFile.name.slice(
              ((selectedFile.name.lastIndexOf(".") - 1) >>> 0) + 2
            );
        if (!allowedExtensions.includes("." + fileExtension.toLowerCase())) {
        setUploadError("Please select an HTML file.");
        return;
      }
    }
    if(selectedFile != null){
        setFile(selectedFile);
    }
    setUploadError(null);
    }

    const handleUpload = async () => {
        if(!file) {
            setUploadError("Please Select a File");
            return
        }
        setUploadError("");
        setUploading(true);
        
        try {
            const response = await s3Client.send({
                Bucket: awsBucket,
                Key: file.name,
                Body: file,
                ContentType: "text/html",
                ACL: "public-read",
              });
              console.log(response);
              if(response){
                setS3Url(response.Location); 
              }
        } catch (error) {
            console.error("Error uploading file to S3:", error);
            setUploadError("Failed to upload file to S3.");
        } finally {
            setUploading(false);
          }
    }

    useEffect(() => {
        console.log("Env got called",awsBucket)
    },)
    
 
  return (
    <div className='items-center justify-center'>
      <h2>Upload an HTML File to AWS S3</h2>
      <input type="file" accept=".html" onChange={handleFileChange} />
      <button className='bg-blue-500 rounded p-2' onClick={handleUpload} disabled={uploading || undefined}>
        Upload
      </button>
      {uploadError && <p className='text-red-600'>{uploadError}</p>}
      {s3Url && <p>File uploaded successfully to: {s3Url}</p>}
    </div>
  );
}

export default Upload