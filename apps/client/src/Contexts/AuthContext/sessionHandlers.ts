export const createSession = (accessToken: string) =>
  fetch("/api/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: accessToken }),
  });

export const updateSession = () =>
  fetch("/api/session", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const deleteSession = () =>
  fetch("/api/session", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
