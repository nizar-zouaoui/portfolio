import { AxiosError } from "axios";
export default function generateApiMessage(error: unknown) {
  if (!(error instanceof AxiosError) || !error.response || !error.response.data)
    return "Something went wrong";
  const { data } = error.response;
  let errorMessage = `${data.message}\n`;
  if (!data.fields) return errorMessage;
  for (const field of data.fields as { msg: string; path: string }[]) {
    errorMessage += `${field["path"]}: ${field["msg"]}\n`;
  }
  console.log(errorMessage);
  return errorMessage;
}
