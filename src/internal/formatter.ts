import * as path from "path";

import csv from 'csv-parse';
import fs from 'fs';

export function ProcessCsv(fPath: string, endDate?: Date){
  const filePath = path.resolve(__dirname, fPath);
    const map = new Map();
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
        .on('error', error => {
            reject(error);
        })
        .pipe(csv())
        .on('data', (data) => {
            let [date, transactionType, token, amount] = data;
            if(token !== "token") {
              const currentDate = new Date(Number(date))
              if(endDate && endDate >= currentDate){
                populateMap(token, Number(amount), map, transactionType)
              }else if(!endDate){
                populateMap(token, Number(amount), map, transactionType)
              }
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