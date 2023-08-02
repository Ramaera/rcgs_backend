import { Injectable, UseGuards } from '@nestjs/common';
import { isInstance } from 'class-validator';
// import { CreateRewardCodeInput } from './dto/create-reward-code.input';
import { PrismaService } from 'nestjs-prisma';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { parse } from 'json2csv';
import { Batch } from 'src/batch/models/batch.models';
import axios, { all } from 'axios';
const fastcsv = require('fast-csv');
import * as fs from 'fs';
import {
  GenerateRewardCodeInput,
  GetRewardCodeInput,
} from './dto/create-reward-code.input';
import { type } from 'os';
const csv = require('csv-parser');
const zip = require('jszip');

async function testpost() {
  const fileNames = [];
  const data = [];

  // Read the CSV file using the 'csv-parser' library
  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      // Process the data and create separate CSV files
      const uniqueValues = new Set(data.map((row) => row['Column_Name']));

      for (const value of uniqueValues) {
        const rows = data.filter((row) => row['Column_Name'] === value);
        console.log('----', rows);
        const fileName = `${value}.csv`;
        fs.writeFileSync(fileName, rows.map((row) => row['code']).join('\n'));
        fileNames.push(fileName);
      }

      // Create a zip file using the 'jszip' library
      const zipf = new zip();
      for (const fileName of fileNames) {
        const data = fs.readFileSync(fileName);
        zipf.file(fileName, data);
      }
      zipf
        .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createWriteStream('Files.zip'))
        .on('finish', () => {
          // Clean up - remove the individual CSV files
          for (const fileName of fileNames) {
            fs.unlinkSync(fileName);
          }
          console.log('Complete');
        });
    });
}

// import ShortUniqueId from 'shortid';
var randomstring = require('randomstring');
function downloadCsv(csvData, fileName) {
  fs.writeFileSync(fileName, csvData, 'utf8');
}

const convertJSONtoCSV = (jsonData, csvFilename) => {
  console.log('check');
  const csvStream = fastcsv.format({ headers: true });

  const writableStream = fs.createWriteStream(csvFilename);
  csvStream.pipe(writableStream);
  jsonData.forEach((data) => {
    csvStream.write(data);
  });

  csvStream.end();

  writableStream.on('finish', () => {
    console.log(`CSV file "${csvFilename}" has been created.`);
  });
};

@Injectable()
export class RewardCodeService {
  constructor(private readonly prisma: PrismaService) {}

  // ****************************************************************************************
  // ****************************************************************************************
  // ******************************Generate Reward Code and Create Batch**********************
  // *****************************************************************************************

  // async GenerateRewardCode(payload: GenerateRewardCodeInput) {
  //   const codes = [];
  //   try {
  //     // var productExist = await this.prisma.product.findUnique({
  //     //   where: { name: payload.name },
  //     // });
  //     // var updatedBatchCode = `${productExist.name}/${payload.batchId}`;
  //     // var batch = await this.prisma.bATCH.findUnique({
  //     //   where: { batchCode: updatedBatchCode },
  //     // });

  //     // if (!batch) {
  //     //   batch = await this.prisma.bATCH.create({
  //     //     data: {
  //     //       batchCode: updatedBatchCode,
  //     //       product: { connect: { id: productExist.id } },
  //     //     },
  //     //   });
  //     // }
  //     for (let i = 0; i < payload.NumberOfrewardCode; i++) {
  //       const reward_code = ShortUniqueId.generate().toUpperCase();
  //       codes.push(reward_code);
  //       await this.prisma.rewardCode.create({
  //         data: {
  //           code: reward_code,
  //           batchCodeId: batch.id,
  //         },
  //       });
  //     }
  //     return codes;
  //   } catch (error) {
  //     console.log(error);
  //     if (error instanceof TypeError) {
  //       if (
  //         error.message === "Cannot read properties of null (reading 'name')"
  //       ) {
  //         console.log('Product does not exist ');
  //         throw new Error(`product dose not exist`);
  //       } else {
  //         throw new Error('check');
  //       }
  //     }
  //   }
  // }

  async GenerateRewardCode(payload: GenerateRewardCodeInput) {
    let codes = [];
    let batchCode = [];

    for (let k = 0; k < payload.NumberOfSheetsRequired; k++) {
      const batchCodeCreate = await this.prisma.bATCH.create({
        data: {},
      });
      batchCode.push(batchCodeCreate.batchCode);

      for (let i = 0; i < 196; i++) {
        const reward_code = randomstring.generate(6);

        const code = await this.prisma.rewardCode.create({
          data: {
            code: reward_code,
            batchCodeId: batchCodeCreate.batchCode,
          },
        });
        codes.push(code);
      }
    }

    convertJSONtoCSV(codes, 'data.csv');
    testpost();

    return codes;
  }

  async getAllCode() {
    const allrewardcode = await this.prisma.rewardCode.findMany();

    // const csvData = parse(allrewardcode);
    // const fileName = 'output.csv';

    // downloadCsv(csvData, fileName);

    // const filePath = 'output.csv';

    // // Read the file from the file system
    // const fileData = fs.readFileSync(filePath);
    // console.log('---------', typeof fileData);
    // try {
    //   const response = await axios
    //     .post('http://127.0.0.1:5000/post', fileData, {
    //       headers: {
    //         'Content-Type': 'text/csv', // Set the appropriate content type for your file
    //       },
    //     })
    //     .then((response) => {
    //       console.log('POST request successful:', response.data);
    //     })
    //     .catch((error) => {
    //       console.error('Error sending POST request:', error);
    //     });
    //   console.log(response);

    //   return allrewardcode;
    // } catch (error) {
    //   console.log(error);
    //   return { message: 'Failed to upload file' };
    // }
    return allrewardcode;
  }
}
