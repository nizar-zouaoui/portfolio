import csv from "csv-parser";
import fs from "fs";
import { isValidNumber } from "libphonenumber-js";

interface ValidatedRow {
  name: string;
  email: string;
  phoneNumber: string;
}

const fullNameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateHeaders(headers: string[]): false | string[] {
  const [col1, col2, col3] = headers.map((header) =>
    header.replace(/\s+/g, "").toLowerCase()
  );
  return (
    col1 === "name" &&
    col2 === "email" &&
    col3 === "phonenumber" && [col1, col2, col3]
  );
}
const checkPhoneNumberFormat = (phoneNumber: string) => {
  const phoneNumberRegex = /^\+\d{1,4}-\d{1,14}$/;
  return phoneNumberRegex.test(phoneNumber);
};

function validateRow(
  row: Record<string, string>,
  headers: string[]
): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const name = row[headers[0]];
  const email = row[headers[1]];
  const phoneNumber = row[headers[2]];

  if (!fullNameRegex.test(name)) {
    errors.push("Invalid name format.");
  }
  if (!emailRegex.test(email)) {
    errors.push("Invalid email format.");
  }
  if (!isValidNumber(phoneNumber) || !checkPhoneNumberFormat(phoneNumber)) {
    errors.push("Invalid phone number.");
  }

  return { isValid: errors.length === 0, errors };
}

export const parseCsv = async (filePath: string) => {
  const validRows: ValidatedRow[] = [];
  const invalidRows: { row: any; errors: string[] }[] = [];

  return new Promise<{ validRows: ValidatedRow[]; invalidRows: any[] }>(
    (resolve, reject) => {
      let headers: string[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("headers", (headersRow) => {
          const actualHeaders = validateHeaders(headersRow);
          if (!actualHeaders) {
            return reject(new Error("Invalid CSV headers."));
          }
          headers = [...actualHeaders];
        })
        .on("data", (row) => {
          console.log("headers");
          console.log(headers);
          console.log("headers");
          const { isValid, errors } = validateRow(row, headers);
          if (isValid) {
            validRows.push(row as ValidatedRow);
          } else {
            invalidRows.push({ row, errors });
          }
        })
        .on("end", () => {
          resolve({ validRows, invalidRows });
        })
        .on("error", (err) => {
          reject(err);
        });
    }
  );
};
