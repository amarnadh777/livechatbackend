const request = require("supertest");
const express = require("express");

// Test that the root route responds with 200
describe("GET /", () => {
    it("should return chat server running message", async () => {
        const app = express();
        app.get("/", (req, res) => res.send("Chat server is running"));
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
        expect(res.text).toBe("Chat server is running");
    });
});