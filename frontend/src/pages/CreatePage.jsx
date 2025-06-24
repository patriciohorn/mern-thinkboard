import { useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Link } from 'react-router';
import NavBar from '../components/NavBar';
import toast from 'react-hot-toast';
import axios from 'axios';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    // fetch -> axios.post
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/notes/', {
        title,
        content,
      });
    } catch (error) {
      console.error('Error creating the note', error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl-mx-auto">
          <Link to={'/'} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                Create New Note
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Write your note here"
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-action justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}>
                    {loading ? 'Creating...' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
