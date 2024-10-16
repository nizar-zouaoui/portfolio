"use client";

import { AxiosError } from "axios";
export default function generateApiMessage(
  error: unknown
): string | React.ReactNode {
  if (
    !(error instanceof AxiosError) ||
    !error.response ||
    !error.response.data
  ) {
    return "Something went wrong";
  }

  const { data } = error.response;

  return (
    <div>
      <p className="font-semibold w-">{data.message}</p>
      {data.fields && (
        <ul className="mt-2">
          {data.fields.map(
            (field: { msg: string; path: string }, index: number) => (
              <li key={index}>
                <span className="font-bold">{field.path}:</span>
                <span className="ml-1">{field.msg}</span>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
