// import { getPublicStorageProvider } from "../common/file-storage/storage-provider";
// import { IStorageProvider } from "../common/file-storage/IStorageProvider";
// import { Service } from "typedi";
// import { v4 as uuidv4 } from "uuid";
// import { FileUpload } from "graphql-upload-ts";
// // import { DataSourceService } from "../db/data-source";
// import { ConfigService } from "../config/config-service";
// import fs from "fs-extra";
// import { buffer } from "stream/consumers";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";  // AWS SDK v3
// const s3Client = new S3Client({ region: "us-east-1" }); // Replace with your region
// import { ReadStream } from "fs";


// @Service()
// export class FileService {
// 	storageProvider: IStorageProvider;
// 	constructor(
// 		// private readonly configService: ConfigurationService,
// 		// private dataSourceService: DataSourceService,
// 		private readonly configService: ConfigService
// 	) {
// 		const  awsAccessKey = this.configService.fileService.awsAccessKey || "";
// 		const  awsSecretKey = this.configService.fileService.awsSecretKey || "";
// 		const  awsBucket = this.configService.fileService.awsBucket || "";
// 		const  awsRegion = this.configService.fileService.awsRegion || "";
		
// 	}

// 	async uploadFileStream(file: FileUpload) {
		
// 		console.log("BICHuNIAAAAA")

// 		const  awsBucket = this.configService.fileService.awsBucket || "";


		



// 		const params = {
// 			Bucket: awsBucket,
//             Key: file.fieldName,  // Root level file
//             Body: file.createReadStream,
// 		};

// 		const data = await s3Client.send(new PutObjectCommand(params));


// 		// return await this.storageProvider.saveStream({
// 		// 	id: `uploads/${uuidv4()}/${file.filename}`,
// 		// 	stream: file.createReadStream(),
// 		// 	headers: {
// 		// 		ContentType: file.mimetype,
// 		// 		CacheControl: "immutable",
				
// 		// 	},
// 		// });

// 	}
// }





import { S3Client,ObjectCannedACL } from "@aws-sdk/client-s3"; // AWS SDK v3
import { FileUpload } from "graphql-upload-ts";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import { Upload } from "@aws-sdk/lib-storage"; // Import Upload from lib-storage
import { ConfigService } from "../config/config-service";

@Service()
export class FileService {
    private s3Client: S3Client;

    constructor(private readonly configService: ConfigService) {

		const isLocal = process.env.NODE_ENV === 'local';

       


		if (isLocal) {
            const awsAccessKey = this.configService.fileService.awsAccessKey || "";
            const awsSecretKey = this.configService.fileService.awsSecretKey || "";
            const awsRegion = this.configService.fileService.awsRegion || "eu-central-1"; // Default region if not provided

            this.s3Client = new S3Client({
                region: awsRegion,
                credentials: {
                    accessKeyId: awsAccessKey,
                    secretAccessKey: awsSecretKey,
                },
            });
        } else {
            // Use default credentials from environment variables for production
            this.s3Client = new S3Client({ region: this.configService.fileService.awsRegion || ""  }); // Replace with your production region
        }
    }
    


    async uploadFileStream(file: FileUpload): Promise<any> {
        const awsBucket = "simple-app-stack-1-dashboardsimpleappstack1gamebui-c2cwi5xtphke";
        // const awsBucket = this.configService.fileService.awsBucket || "";

        const fileKey = `uploads/${uuidv4()}/${file.filename}`;

        const uploadParams = {
            Bucket: awsBucket,
            Key: fileKey,
            Body: file.createReadStream(), 
            ContentType: file.mimetype, 

            
        };

        const upload = new Upload({
            client: this.s3Client,
            params: uploadParams,
            leavePartsOnError: false, 
            
        });

        try {
            const data = await upload.done(); 
            console.log("Successfully uploaded file to S3:", data);

            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error("Error uploading file to S3:", error);
        }
    }
}





// import { getPublicStorageProvider } from "../common/file-storage/storage-provider";
//    import { IStorageProvider } from "../common/file-storage/IStorageProvider";
//    import { Service } from "typedi";
//    import { v4 as uuidv4 } from "uuid";
//    import { FileUpload } from "graphql-upload-ts";
//    import { ConfigService } from "../config/config-service";

//    @Service()
//    export class FileService {
//      storageProvider: IStorageProvider;

//      constructor(private readonly configService: ConfigService) {
//        const awsAccessKey = this.configService.fileService.awsAccessKey || "";
//        const awsSecretKey = this.configService.fileService.awsSecretKey || "";

//        console.log('AWS Access Key:', awsAccessKey);
//        console.log('AWS Secret Key:', awsSecretKey && awsSecretKey.substring(0, 5) + '...');

//        this.storageProvider = getPublicStorageProvider().getStorageProvider({
//          provider: "S3",
//          providerOptions: {
//            accessKeyId: awsAccessKey,
//            secretAccessKey: awsSecretKey,
//            region: "us-east-1",
//            bucket: "grief-files",
//          },
//        });
//      }

//      async uploadFileStream(file: FileUpload) {
//        console.log("Starting file upload...");
//        try {
//          const result = await this.storageProvider.saveStream({
//            id: `uploads/${uuidv4()}/${file.filename}`,
//            stream: file.createReadStream(),
//            headers: {
//              ContentType: file.mimetype,
//              CacheControl: "immutable",
//            },
//          });
//          console.log("Upload successful:", result);
//          return result;
//        } catch (error) {
//          console.error("Upload failed:", error);
//          throw error;
//        }
//      }
//    }