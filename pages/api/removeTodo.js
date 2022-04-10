import connectDb from "../../middleware/mongoose";
import Todo from "../../models/Todo";

const handler = async (req, res) => {
  const { id } = req.body;
  if (req.method == "POST") {
    const todo = await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo removed successfully"});
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default connectDb(handler);
