import { Link } from "react-router"
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/util.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

export default function NoteCard({ note, setNotes }){

    const handleDelete = async (e,id) => {
        e.preventDefault();
        e.stopPropagation();

        if(!window.confirm("Are you sure you want to delete this note ?")) return;

        try {
            api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id))
            toast.success("Note deleted successfully!");
        } catch (error) {
            console.log("Error in handleDelete ",error);
            toast.error("Failed to delete note");
        }
    }
    return(
        <Link to={`note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid  border-amber-200 mt-5">
            <div className="card-body">
                <h3 className="card-title text-warning">{note.title}</h3>
                <p className="text-warning/70 line-clamp-3">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-warning/60">
                        {formatDate(note.createdAt)}
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4"/>
                        <button className="btn btn-ghost btn-xs text-error">
                        <Trash2Icon  onClick={(e)=> handleDelete(e, note._id)} className="size-4"/>
                        </button>
                    </div>
                </div>
            </div>
        </Link>

    );
}