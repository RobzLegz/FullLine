import crypto from "crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, unlinkSync } from "fs";

const s3 =
  process.env.AWS_REGION_VAR &&
  process.env.AWS_S3_ACCESS_KEY_ID &&
  process.env.AWS_S3_SECRET_ACCESS_KEY
    ? new S3Client({
        region: process.env.AWS_REGION_VAR,
        credentials: {
          accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID
            ? process.env.AWS_S3_ACCESS_KEY_ID
            : "",
          secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
            ? process.env.AWS_S3_SECRET_ACCESS_KEY
            : "",
        },
      })
    : null;

export const uploadFile = async (file: any, buff: any = null) => {
  try {
    if (!s3) {
      return null;
    }

    const hashsum = crypto.createHash("sha256");

    let fileRead = false;

    if (!buff) {
      buff = readFileSync(file.tempFilePath);
      fileRead = true;
    }

    if (!buff) {
      return null;
    }

    hashsum.update(buff);
    const file_ext = file.name.split(".").pop();
    const filename = hashsum.digest("hex") + "." + file_ext;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: filename,
        Body: buff,
      })
    );

    if (fileRead) {
      unlinkSync(file.tempFilePath);
    }
    
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION_VAR}.amazonaws.com/${filename}`;
  } catch (err) {
    console.log(err);
    return null;
  }
};
