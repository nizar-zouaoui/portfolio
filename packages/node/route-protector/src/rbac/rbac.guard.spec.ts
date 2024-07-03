import { Reflector } from "@nestjs/core";
import { RbacGuard } from "./rbac.guard";

describe("RbacGuard", () => {
  it("should be defined", () => {
    expect(new RbacGuard(new Reflector())).toBeDefined();
  });
});
