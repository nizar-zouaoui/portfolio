import createHttpError from "http-errors";
import { TestType, Tester } from "../../models";

export const getTestData = async () => {
  const testData = await Tester.find();
  return testData;
};

export const getTestDataById = async (id: string) => {
  const testData = await Tester.findById(id);
  return testData;
};

export const addTestData = async (data: TestType) => {
  const testData = await Tester.create(data);
  return testData;
};

export const updateTestData = async (id: string, data: TestType) => {
  const testData = await Tester.findByIdAndUpdate(id, data);
  return testData;
};

export const deleteTestData = async (id: string) => {
  const testData = await Tester.findByIdAndDelete(id);
  return testData;
};
