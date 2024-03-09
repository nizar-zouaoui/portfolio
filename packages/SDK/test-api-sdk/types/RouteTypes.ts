export type TestApiRouteTypes = {
  "/offer/": {
    POST: {
      body: {};

      response: string;
    };
    GET: {
      query: {
        page?: string;
        limit?: string;
        "sort-direction"?: string;
        "sort-field"?: string;
        keyword?: string;
      };
      response: {
        items: Array<{}>;
        page: number;
        hasNextPage: boolean;
        totalItems: number;
        totalPages: number;
      };
    };
  };
  "/offer/:id": {
    PUT: {
      body: {};

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
      response: {};
      params: {
        id: string;
      };
    };
  };
};
