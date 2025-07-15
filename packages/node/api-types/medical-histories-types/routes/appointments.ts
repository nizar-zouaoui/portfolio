import { LeanActDocument } from "../models/acts";
import { IAppointment, LeanAppointmentDocument } from "../models/appointments";

export type AppointmentRouteTypes = {
  "/appointments/:medicalHistoryId": {
    POST: {
      body: IAppointment;
      params: {
        medicalHistoryId: string;
      };
      response: string;
    };
  };
  "/appointments/:id": {
    PATCH: {
      body: Partial<IAppointment>;
      response: string;
      params: {
        id: string;
      };
    };
    DELETE: {
      response: string;
      params: {
        id: string;
      };
    };
    GET: {
      response: LeanAppointmentDocument & {
        act: LeanActDocument;
      };
      params: {
        id: string;
      };
    };
  };
};
