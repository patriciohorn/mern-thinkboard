import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import RateLimitedUI from '../components/RateLimitedUI';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import { Loader } from 'lucide-react';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // axios uses JSON.parse() under the hood, I don't need res.json() anymore

        const res = await api.get('/notes');
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error('Error fetching notes', error);
        console.log(error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to load notes');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <NavBar />
      <h1>Wazaaaaa</h1>
      {isRateLimited && <RateLimitedUI />}

      <div className="mx-auto max-w-7xl p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10 flex justify-center gap-4">
            <Loader className="size-8 text-primary animate-spin" />
            Loading notes...
          </div>
        )}

        {notes.length === 0 && !loading && !isRateLimited && (
          <NotesNotFound />
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                setNotes={setNotes}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
