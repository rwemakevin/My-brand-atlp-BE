import request from "supertest";
import { url, userCredentials } from "../credentials.js";

let jwtToken;

beforeAll(async () => {
  const response = await request(url).post("/login").send(userCredentials);
  jwtToken = response.body.token;
});

describe("Get list of all Blogs", () => {
  it("Any one should view all blogs", async () => {
    const res = await request(url).get("/blogs");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("totalBlogs");
  });

  it("any one should Open a single valid Blog", async () => {
    const id = "65e8dee49d88f29f5673519b";
    const res = await request(url).get(`/blogs/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });

  it("admin should handle Invalid Blog Id", async () => {
    const id = "iop";
    const res = await request(url).get(`/blogs/${id}`);
    expect(res.status).toBe(404);
  });

  it("Only Blogger, admin, Superadmin can delete a blog", async () => {
    //admin logs in
    const level2Role = {
      email: "developer.purpose@gmail.com",
      password: "passWORD123!",
    };
    const login = await request(url).post("/login").send(level2Role);
    const authToken = login.body.token;

    //set Blog Id
    const id = "65e90e43f17694eda16d48e9";
    const response = await request(url)
      .delete(`/blogs/${id}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  it("Other can't delete a blog", async () => {
    //admin logs in
    const level2Role = {
      email: "Rwemauser@gmail.com",
      password: "passWORD123!",
    };
    const login = await request(url).post("/login").send(level2Role);
    const authToken = login.body.token;

    //set Blog Id
    const id = "65e90e43f17694eda16d48e9";
    const response = await request(url)
      .delete(`/blogs/${id}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toBe(403);
  });
});
