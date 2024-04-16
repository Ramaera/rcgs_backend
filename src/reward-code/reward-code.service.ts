import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
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

const testpost = () => {
  console.log('checktest');
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
      const uniqueValues = new Set(data.map((row) => row['batchCodeId']));
      for (const value of uniqueValues) {
        const rows = data.filter((row) => row['batchCodeId'] === value);

        const fileName = `${value}.csv`;
        console.log('----', fileName);
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
};

// import ShortUniqueId from 'shortid';
var randomstring = require('randomstring');

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

  //  Genrate reward Code

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
    setTimeout(testpost, 5000);
    // testp
    // var minBatchCode = Math.min.apply(
    //   null,
    //   codes.map((v) => v.batchCodeId),
    // );
    // var maxBatchCode = Math.min.apply(
    //   null,
    //   codes.map((v) => v.batchCodeId),
    // );

    // codes.push(Math.min());
    return codes;
  }

  async getAllCode() {
    const allrewardcode = await this.prisma.rewardCode.findMany();
    return allrewardcode;
  }

  async getCodeDetails(rewardCode: string) {
    const codeData = await this.prisma.rewardCode.findUnique({
      where: {
        code: rewardCode,
      },
      include: {
        batch: true,
        product: true,
      },
    });

    if (!codeData) {
      throw new NotFoundException(`Reward Code ${rewardCode} is Not Correct`);
    }
  }
}
