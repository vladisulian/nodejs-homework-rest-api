const app = require("./app");

const { DB } = require("./mongoDB");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);

  DB(); // ? database connection
});
