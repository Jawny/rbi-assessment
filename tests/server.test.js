const axios = require("axios");
const express = require("express");
const request = require("supertest");

const app = express(); //an instance of an express app, a 'fake' express app

jest.mock("", () => [
  {
    _id: "5ff69f80228fbc4962011cd8",
    scores: [30, 15],
  },
]);

describe("Tests", () => {
  it("GET data from database", async () => {
    const { body } = await request(app).get("/");
    console.log(body);
  });
});
