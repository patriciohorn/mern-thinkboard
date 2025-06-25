import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Link, useParams, useNavigate } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log('Error in fetching note', error);
        toast.error('Failed to fetch the note');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted');
      navigate('/');
    } catch (error) {
      console.error('Error deleting the note', error);
      toast.error('Failed to delete note');
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error('Please add a title or content');
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success('Note updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error saving the note', error);
      toast.error('Failed to update note');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-primary py-10 flex items-center justify-center gap-4">
            <Loader className="size-8 text-primary animate-spin" />
            Loading note...
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link to={'/'} className="btn btn-ghost">
                <ArrowLeftIcon className="size-5" />
                Back to Notes
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-error btn-outline">
                Delete Note
              </button>
            </div>

            <div className="card bg-base-100">
              <div className="card-body">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note title"
                    className="input input-bordered"
                    value={note.title}
                    disabled={saving}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={saving}>
                    {saving ? 'Saving Changes...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetailPage;
