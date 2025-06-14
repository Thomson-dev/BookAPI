import app from "./server";
import connectDB from "./utils/db"; // Adjust the path as needed

connectDB();

const port =5000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});