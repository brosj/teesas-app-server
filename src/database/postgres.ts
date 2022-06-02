import db from "./models";
import { users } from "./seeders/users";
import { lessons } from "./seeders/lessons";

// Connect to postgres database
db.sequelize
  .sync()
  .then(console.log("Postgres database connected."))
  .then(() => createEntries()) // Add mock data to the database.
  .catch((err: any) =>
    console.error("Unable to connect to the database.", err)
  );

// Mock data
const createEntries = () => {
  users.map((user) => {
    db.User.create(user);
  });

  lessons.map((lesson) => {
    db.Lesson.create(lesson);
  });
};
