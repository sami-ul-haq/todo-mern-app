import { Todo } from "../models/todos.model.js";
import { User } from "../models/user.model.js";


export const getAllTodos = async (req,res) => {
    try {
        const todos = await Todo.find();
        
        if(!todos) return res.status(400).json({ message: "No Todos, Add first" });

        res.status(200).json({ message: "Todos", todos });

    } catch (error) {
        res.status(404).json({ message: "Todos not found" });
    }
}

export const getTodosByUser = async (req,res) => {
    const userId =  req.params.id;
    console.log("User id", userId);
    try {
        const todos = await Todo.find({user:userId});
        console.log("These are todos", todos);
        if(!todos) return res.status(400).json({ message: "No Todos, Add first" });

        res.status(200).json({ message: "Todos", todos });

    } catch (error) {
        res.status(404).json({ message: "Todos not found" });
    }
}

export const addTodo = async (req,res) => {
    const { title, body, email } = req.body;
    try {
        const userExists = await User.findOne({email});
        if(!userExists) return res.status(402).json({ message: "You're not allowed to perform this operation" });

        const todo = await new Todo({title, body, user: userExists}).save();
        userExists.todos.push(todo);
        await userExists.save();
        res.status(200).json({ message: "Todo Added Successfully", todo });

    } catch (error) {
        res.status(500).json({ message: "Internal server Error", error });
    }
    
}

export const updateTodo = async (req,res) => {
    const { title, body, email } = req.body;
    const todoId = req.params.id;

    try {
        const userExists = await User.findOne({email});

        if(!userExists) return res.status(401).json({ message: "You're not allowed to perform this operation" });

        const todos = await Todo.findByIdAndUpdate(todoId, {title, body});
        await todos.save();

        res.status(200).json({ message: "Todo Updated Successfully", todos });

    } catch (error) {
        res.status(500).json({ message: "Internal server Error", error });
    }
}

export const deleteTodo = async (req,res) => {
        const todoId = req.params.id;
        const {email} = req.body;
        try {
            const userExists = await User.findOneAndUpdate({email}, { $pull: { todos: todoId}});
    
            if(!userExists) return res.status(401).json({ message: "You're not allowed to perform this operation" });
    
            // const todo = await Todo.findByIdAndDelete(todoId);
            
            const deletedTodo = await Todo.findByIdAndDelete(todoId);

            res.status(200).json({ message: "Todo Deleted Successfully", deletedTodo });
    
        } catch (error) {
            res.status(500).json({ message: "Internal server Error", error });
        }
    }