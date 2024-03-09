import { TestApiRouteTypes } from "./routeTypes";

export type TestApiSDKTypes = {
  addTestDataBody: TestApiRouteTypes["/offer/"]["POST"]["body"];
  addTestDataResponse: TestApiRouteTypes["/offer/"]["POST"]["response"];
  getTestDatasQuery: TestApiRouteTypes["/offer/"]["GET"]["query"];
  getTestDataResponse: TestApiRouteTypes["/offer/"]["GET"]["response"];
  getTestDataByIdParams: TestApiRouteTypes["/offer/:id"]["GET"]["params"];
  getTestDataByIdResponse: TestApiRouteTypes["/offer/:id"]["GET"]["response"];
  updateTestDataParams: TestApiRouteTypes["/offer/:id"]["PUT"]["params"];
  updateTestDataBody: TestApiRouteTypes["/offer/:id"]["PUT"]["body"];
  updateTestDataResponse: TestApiRouteTypes["/offer/:id"]["PUT"]["response"];
  deleteTestDataByIdParams: TestApiRouteTypes["/offer/:id"]["DELETE"]["params"];
  deleteTestDataByIdResponse: TestApiRouteTypes["/offer/:id"]["DELETE"]["response"];
};
