import { UpdateSessionReturnType } from "../../helpers/session-management/SessionTypes";

export const createSession = (accessToken: string) =>
  fetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: accessToken }),
  });

export const updateSession = async (): Promise<UpdateSessionReturnType> => {
  const response = await fetch("/api/session", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json() as Promise<UpdateSessionReturnType>;
};

export const deleteSession = () =>
  fetch("/api/session", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
