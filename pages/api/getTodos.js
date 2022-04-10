import connectDb from "../../middleware/mongoose";
import Todo from "../../models/Todo";

const handler = async (req, res) => {
    let todos = await Todo.find();
    res.status(200).json({ todos });
};

export default connectDb(handler);
