const app = require("./app");

require("./mongoDB"); // ? database connection
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
