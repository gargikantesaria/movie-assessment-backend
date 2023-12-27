"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aws = void 0;
const AWS = __importStar(require("aws-sdk"));
const fs = __importStar(require("fs"));
const uuid_1 = require("uuid");
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const s3 = new AWS.S3();
class Aws {
    // upload to S3
    async uploadImage(file, storeToFolder, filename) {
        const ext = file.name.split('.')[1];
        let key;
        if (!filename) {
            key = `${storeToFolder}/${(0, uuid_1.v4)()}.${ext}`;
        }
        else {
            key = `${storeToFolder}/${filename}`;
        }
        const type = file.type || file.mimetype;
        const putObject = await this.s3PutObject(file, key, type);
        if (putObject) {
            return {
                // encodeURIComponent in case of file name having some special character which is not accepted by s3, so we need to encode it.
                key: `${encodeURIComponent(putObject.key)}`,
            };
        }
        else {
            return false;
        }
    }
    async s3PutObject(file, key, type) {
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
    async deleteImage(url) {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: url,
            };
            s3.deleteObject(params, (err, data) => {
                if (err) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
}
exports.Aws = Aws;
//# sourceMappingURL=aws.js.map