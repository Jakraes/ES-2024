import * as fs from "fs";
import * as csvToJson from "convert-csv-to-json";

export const load = async () => {
  const json = new Promise((resolve, reject) => {
    let data = csvToJson.getJsonFromCsv("./uploads/CaracterizaçãoDasSalas.csv");

    resolve(data);
  });

  const json2 = new Promise((resolve, reject) => {
    let data = csvToJson.getJsonFromCsv("./uploads/temp.csv");
    resolve(data);
  });

  return {
    json,json2
  };
  /**
  return {
    json,
  };*/
};
