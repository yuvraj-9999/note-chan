import mongoose from "mongoose";

// first create a schema
// then create a model based off of that scahema

const noteSChema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    
},
{
    timestamps: true,
},
);

const Note = mongoose.model("Note", noteSChema);

export default Note;