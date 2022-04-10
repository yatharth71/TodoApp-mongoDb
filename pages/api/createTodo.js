import connectDb from "../../middleware/mongoose";
import Todo from "../../models/Todo";

const handler = async (req, res) => {
  const { desc } = req.body;
  if (req.method == "POST") {
    const todo = new Todo({ desc });
    await todo.save();
    res.status(200).json({ message: "Todo created successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default connectDb(handler);
