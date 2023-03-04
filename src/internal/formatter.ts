import * as path from "path";

import csv from 'csv-parse';
import { endOfDay } from "date-fns";
import fs from 'fs';

export function ProcessCsv(fPath: string, endDate?: Date){
  const filePath = path.resolve(__dirname, fPath);
    const map = new Map();
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
        .on('error', error => {
            reject(error);
        })
        .pipe(csv({from_line: 2}))
        .on('data', (data) => {
            let [date, transactionType, token, amount] = data;
            const actualAmount = Number(amount)
            const currentDate = Number(date)
            const comparedDate = endOfDay(new Date(endDate)).getTime();
            if(endDate && comparedDate >= currentDate){
              populateMap(token, actualAmount, map, transactionType)
            }else if(!endDate){
              populateMap(token, actualAmount, map, transactionType)
            }
        })
        .on('end', () => {
            resolve(map);
      })
    })
}

function populateMap(token: string, amount: number, map: Map<string, number>, transactionType: string){
    const currentValue = map.get(token) ?? 0;
    const deposit = currentValue + Number(amount);
    const withdrawal = currentValue - Number(amount);
    const value = transactionType === "DEPOSIT" ? deposit : withdrawal
    map.set(token, value);
}