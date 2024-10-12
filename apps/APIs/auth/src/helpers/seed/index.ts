import { AuthMethods, IAuth, IUser } from "@nizar-repo/auth-types";
import {
  DEFAULT_ROLES_NAMES,
  godRole,
  userRole,
} from "@nizar-repo/auth-types/enums/defaultRoles";
import Auth from "models/auth";
import Role from "models/roles";
import User from "models/users";
import { mongo } from "mongoose";
import { getRoleByName } from "services/roles";

const rootAuth: IAuth = {
  email: process.env.USER_EMAIL!,
  password: process.env.USER_PASSWORD!,
  authMethod: AuthMethods.CLASSIC,
};

const rootUser: IUser = {
  email: process.env.USER_EMAIL!,
  username: process.env.USER_USERNAME!,
};
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

const seedRole = async () => {
  try {
    const role = await Role.create(godRole);
    console.log("GOD Role Created Successfully");
    await Role.create(userRole);
    console.log("USER Role Created Successfully");
    return role;
  } catch (error) {
    if (!(error instanceof mongo.MongoServerError && error.code === 11000)) {
      console.log("============error=============");
      throw error;
    }
    return;
  }
};

const seedAuth = async () => {
  try {
    const auth = new Auth({
      ...rootAuth,
      password: await hashPassword(rootAuth.password),
    });
    console.log("Root Auth Created Successfully");
    return auth;
  } catch (error) {
    console.log(error);
  }
};

const seedUser = async () => {
  try {
    const user = new User(rootUser);
    console.log("Root User Created Successfully");
    return user;
  } catch (error) {
    console.log(error);
  }
};
const seed = async () => {
  let role = await seedRole();
  if (!role) role = await getRoleByName(DEFAULT_ROLES_NAMES.GOD);
  const auth = await seedAuth();
  if (!auth) return;
  const user = await seedUser();
  if (!user) return;
  auth.userId = user._id;
  user.auths.push(auth._id.toString());
  user.roleId = role._id.toString();
  try {
    await auth.save();
    await user.save();
  } catch (error) {
    console.log("Auth and User already seeded!");
    return;
  }
  console.log("GOD Role Seeded Successfully");
  console.log("Root Auth Seeded Successfully");
  console.log("Root User Seeded Successfully");
};

seed();
