import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { toast } from "react-hot-toast"
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required!")
      return;
    }
    setLoading(true);

    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully!")
      navigate("/")
    } catch (error) {
      console.log(error);
      if (error.response?.status === 429) {
        toast.error("Slow down! What's the hurry", {
          duration: 4000,
          icon: "💀",
        });
      }else if (error.request){
        toast.error("Server not responding!");
      }
      else {

        toast.error("Failed to create note!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-base-content/10'>
      <div className='container mx-auto  px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn text-warning hover:btn-warning hover:text-black transition duration-200 mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back to Notes
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4 text-warning'>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label mb-2'>
                    <span className='label-text text-warning'>Title</span> <br />
                  </label> <br />
                  <input type="text" placeholder='Note Title' className='input input-bordered text-warning px-5 rounded-3xl w-full' value={title} onChange={(e) => setTitle(e.target.value)} />

                </div>
                <div className="form-control mb-4">
                  <label className='label mb-2'>
                    <span className='label-text text-warning'>Content</span>
                  </label><br />
                  <textarea placeholder='Write your note here...' className='h-32 w-full textarea textarea-bordered text-warning rounded-3xl px-5 py-3' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="card-actions justify-end">
                  <button type='submit' className='btn btn-warning rounded-3xl' disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage