import * as AWS from "aws-sdk";
import * as fs from "fs";
import { v4 as uuidv4 } from 'uuid';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3: AWS.S3 = new AWS.S3();

export class Aws {

    // upload to S3
    public async uploadImage(file, storeToFolder, filename?) {
        const ext = file.name.split('.')[1];
        let key;
        if (!filename) {
            key = `${storeToFolder}/${uuidv4()}.${ext}`;
        } else {
            key = `${storeToFolder}/${filename}`;
        }
        const type = file.type || file.mimetype;
        const putObject: any = await this.s3PutObject(file, key, type);
        if (putObject) {
            return {
                // encodeURIComponent in case of file name having some special character which is not accepted by s3, so we need to encode it.
                key: `${encodeURIComponent(putObject.key)}`,
            };
        } else {
            return false;
        }
    }

    public async s3PutObject(file, key, type) {
        return new Promise((resolve, reject) => {
            fs.readFile(file.tempFilePath, (error, fileContent) => {
                if (error) {
                    return false;
                }
                const params = {
                    // ACL: "public-read",
                    Body: fileContent,
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    // ContentDisposition: "inline",
                    ContentType: type,
                    Key: key,
                };
                s3.putObject(params, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve({ key });
                });
            });
        });
    }

    // delete from s3
    public async deleteImage(url: string) {
        return new Promise((resolve, reject) => {
            const params: any = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: url,
            };

            s3.deleteObject(params, (err: any, data) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        })
    }

}