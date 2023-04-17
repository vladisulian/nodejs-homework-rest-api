const app = require("./app");

const { DB } = require("./mongoDB");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");

  DB(); // ? database connection
});
