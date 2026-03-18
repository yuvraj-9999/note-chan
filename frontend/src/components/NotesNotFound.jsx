import React from 'react'
import { NotebookIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const NotesNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
        <div className='bg-warning/10 p-8 rounded-full'>
            <NotebookIcon className='size-10 text-warning'/>
        </div>
        <h3 className='text-2xl font-bold text-warning/90'>No Notes Yet!</h3>
        <p className='text-warning/80'>
            Ready to organize your thoughts? Create your first note to get started on your journey.
        </p>
        <Link to={"/create"} className='btn btn-warning'>
            Create Your First Note
        </Link>
    </div>
  )
}

export default NotesNotFound