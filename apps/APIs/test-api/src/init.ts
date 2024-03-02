import { Router } from "express";
// @ts-ignore
import { wrapRouter } from "express-promisify-router";

export const baseUrl = "/api/v1/test-api";

export const router = wrapRouter(Router());
