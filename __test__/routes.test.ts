import request from "supertest";
import app from "../src/app";
import User from "../src/database/models/user";
import db from "../src/database/models";

afterAll(async () => {
  // delete test user from database
  await User(db.sequelize, db.Sequelize.DataTypes).destroy({
    where: {
      email: "test@example.com"
    }
  });
});

describe("Test for user authentication", () => {
  test("Register a student", async () => {
    const response = await request(app)
      .post("/signup")
      .send({
        childName: "Test User",
        email: "test@example.com",
        phoneNumber: 8123456789,
        countryCode: 44,
        password: "password",
        confirmPassword: "password",
        grade: "Good",
      })
      .expect(201);

    expect(response.body.message).toBe("learner created successfully");
  });

  test("User cannot login with invalid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "user@notexist.com", password: "password" })
      .expect(403);

    expect(response.body.message).toBe("Invalid credentials.");
  });

  test("User can login with valid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200);

    expect(response.body.message).toBe("login successful");
  });
});
