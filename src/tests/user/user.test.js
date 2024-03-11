import request from "supertest";
import { userCredentials, url, registerCredentials } from "../credentials.js";

import dotenv from "dotenv";

dotenv.config();

let jwtToken;

beforeAll(async () => {
  const response = await request(url).post("/login").send(userCredentials);
  jwtToken = response.body.token;
});

// Get users
describe("Get List of all users", () => {
  it("Authorized user should view the list", async () => {
    const response = await request(url)
      .get("/users")
      .set("authorization", `Bearer ${jwtToken}`);

    expect(response.status).toBe(200);
  });

  it("Non authenticated user shouldn't View the list", async () => {
    const response = await request(url).get("/users");
    expect(response.status).toBe(401);
  });
});

describe("Authentication", () => {
  it("should not allow Invalid credentials to log in", async () => {
    const invalidCredentials = {
      email: "123@gmail.com",
      password: "234",
    };
    const res = await request(url).post("/login").send(invalidCredentials);
    expect(res.status === 401 || res.status === 404).toBeTruthy();
  });

  it("user Should be allowed in if credentials are valid", async () => {
    const validCredentials = {
      email: "developer.purpose@gmail.com",
      password: "passWORD123!",
    };
    const res = await request(url).post("/login").send(validCredentials);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

describe("signup", () => {
  it("USer with Valid signup Data should be registered", async () => {
    const validUser = {
      name: "Kevin Rwema",
      email: "urwegoOppBank@gmail.com",
      password: "passWORD123!",
      verifyPassword: "passWORD123!",
    };
    const res = await request(url).post("/register").send(validUser);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });

  it("Existing user shouldn't be registered", async () => {
    const existingUser = {
      name: "Kevin Rwema",
      email: "developer.purpose@gmail.com",
      password: "passWORD123!",
      verifyPassword: "passWORD123!",
    };
    const res = await request(url).post("/register").send(existingUser);
    if (res.body.message === "user already exist") {
      expect(res.status).toBe(400);
    }
  });
});
