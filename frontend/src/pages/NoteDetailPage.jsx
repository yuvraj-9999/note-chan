import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ArrowLeftIcon, Trash2Icon, LoaderIcon } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const NoteDetailPage = () => {
    const [note, setNote] = useState(null);
    const[ loading, setLoading ] = useState(true);
    const [ saving, setSaving ] = useState(false);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
      const fetchNote = async () => {
        try {
          const res = await api.get(`/notes/${id}`);
          setNote(res.data);
        } catch (error) {
          toast.error("Failed to fetch the note")
        }finally{
          setLoading(false);
        }
      }
      fetchNote();
    },[id]);

    const handleDelete = async () => {
      if(!window.confirm("Are you sure you want to delete this note?")) return;

      try {
        await api.delete(`/notes/${id}`);
        navigate("/")
        toast.success("Note deleted successfully!")
      } catch (error) {
        toast.error("Failed to delete note")
      }
    };

    const handleSave = async () => {
      if(!note.title.trim() || !note.content.trim()){
        toast.error("PLease fill all the fields!");
        return;
      }
      setSaving(true);

      try {
        await api.put(`/notes/${id}`, note);
        navigate("/");
        toast.success("Note updated successfully!")
      } catch (error) {
        toast.error("Failed to update note")
      }finally{
        setSaving(false)
      }
    };

    if(loading){
      return(
      <div className='min-h-screen flex items-center justify-center bg-warning/10'>
        <LoaderIcon className='animate-spin size-10 text-warning'/>
      </div>

      );
    }
    

    return(
      <div className='bg-warning/10 min-h-screen'>
        <div className='container mx-auto px-4 py-8'>
          <div className='max-w-2xl mx-auto'>
            <div className=' flex justify-between items-center'>
            <Link to={"/"} className='mb-6 btn text-warning hover:btn-warning rounded-3xl hover:text-black transition duration-200'>
                <ArrowLeftIcon className='size-5'/>
                Back to Notes
                
            </Link>
            <button onClick={() => handleDelete()} className='mb-6 btn text-error border-error rounded-3xl hover:btn-error hover:text-black transition duration-200'>
                <Trash2Icon className='size-5'/>
                Back to Notes
                
            </button>

            </div>

            <div className='card bg-base-100'>
              <div className='card-body'>
                <h2 className="card-title text-2xl text-warning mb-4">Update Note</h2>
                <form >
                  <div className="form-control mb-4">
                    <label className="label mb-2">
                      <span className="label-text text-warning">Title</span>
                    </label>
                    <input type="text" placeholder='Note Title' className="w-full input input-bordered text-warning rounded-3xl px-5 " value={note.title} onChange={(e) => setNote({...note, title: e.target.value})}/>
                  </div>
                  <div className="form-control mb-4">
                    <label className="label mb-2">
                      <span className="label-text text-warning">Content</span>
                    </label>
                    <textarea name="" id="" className="textarea textarea-bordered w-full text-warning h-32 px-5 py-3 rounded-3xl" placeholder='Write your note here...' value={note.content} onChange={(e) => setNote({...note, content: e.target.value})}></textarea>
                  </div>

                  <div className='card-actions justify-end'>
                    <button onClick={()=> handleSave()} className='btn btn-warning rounded-3xl ' disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
                  </div>
                </form>
              </div>

            </div>
          </div>

        </div>

      </div>
    );
}

export default NoteDetailPage