export enum SESSION_STATUS {
  SESSION_UPDATED = "SESSION_UPDATED",
  SESSION_DELETED = "SESSION_DELETED",
}

export type UpdateSessionReturnType =
  | {
      sessionStatus: SESSION_STATUS.SESSION_UPDATED;
      userData: {
        email: string;
        username: string;
      };
    }
  | {
      sessionStatus: SESSION_STATUS.SESSION_DELETED;
      userData: null;
    }
  | null;
