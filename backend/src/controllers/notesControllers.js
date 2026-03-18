import Note from "../models/Note.js"

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); //Newest first(-1)
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in getAllNotes controller ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getNoteById(req, res){
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    } catch (error) {
        console.log("Error in getNoteById controller ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        
        if (!title?.trim() || !content?.trim()) {
            return res.status(400).json({
                message: "Title and content are required",
            });
        }
        
        const note = new Note({ title, content });
        const savedNote = await note.save();

        res.status(201).json(savedNote);
    } catch (error) {
        console.log("Error in createNotes controller ", error);
        if(error.name === "ValidationError"){
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
            title,
            content,
        },
            { new: true, },
        );

        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note updated successfully", note: updatedNote });
    } catch (error) {
        console.log("Error in updateNotes controller ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteNote(req, res) {
    try {

        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted" });
    } catch (error) {
        console.log("Error in deleteNotes controller ", error);
        res.status(500).json({ message: "Internal servevr error" });
    }
}