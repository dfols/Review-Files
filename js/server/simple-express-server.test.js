const request = require("supertest");
const app = require("./simple-express-server"); // make sure to change the path to where your Express server file is

describe("API Endpoints", () => {
  // Testing the GET endpoint
  it("should return a message from the GET endpoint", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("I'm a server!");
  });

  // Testing the POST endpoint
  it("should return the posted object from the POST endpoint", async () => {
    const postData = { key: "value" };
    const res = await request(app).post("/").send(postData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(postData);
  });
});
