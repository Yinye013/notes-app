import React, { useState } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
}
function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNotes, setSelectedNotes] = useState<Note | null>(null);

  // TODO: HANDLING FORM SUBMISSION
  // FIXME: WORKS
  const handleSubmitNotes = (e: any) => {
    e.preventDefault();
    setNotes([newNote, ...notes]);
    setTitle('');
    setContent('');
  };

  // TODO: HANDLING CLICKED NOTES
  // FIXME:  WORKS
  const handleNoteClicked = (note: Note) => {
    setSelectedNotes(note);
    setTitle(note.title);
    setContent(note.content);
  };

  // UPDATING...EDITING NOTES
  const handleUpdatedNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNotes) return;
    const updatedNote: Note = {
      id: selectedNotes.id,
      title: title,
      content: content,
    };
    const updatedNotesList = notes.map((note) =>
      note.id === selectedNotes.id ? updatedNote : note
    );
    setNotes(updatedNotesList);
    setTitle('');
    setContent('');
    setSelectedNotes(null);
  };

  // CANCELLING FUNCTIONALITY
  const handleCancel = () => {
    setTitle('');
    setContent('');
    setSelectedNotes(null);
  };

  // DELETE FUNCTIONALITY

  const deleteNotes = (e: React.MouseEvent, noteId: number) => {
    e.stopPropagation(); //since this is nested in a div that has an onClick function;

    const updatedNotes = notes.filter((note) => note.id !== noteId);

    setNotes(updatedNotes);
  };

  const newNote: Note = {
    id: notes.length + 1,
    title: title,
    content: content,
  };
  return (
    <>
      <div className="max-w-[120rem] mx-auto sm:p-4">
        <nav className="h-[9rem] flex justify-center text-2xl md:text-[5rem] uppercase font-bold md:mb-[4rem] text-white">
          TAKE YOUR NOTES DOWN...
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-[5rem]">
          <div>
            <form
              className="flex flex-col gap-[2rem]"
              onSubmit={(event) =>
                selectedNotes
                  ? handleUpdatedNotes(event)
                  : handleSubmitNotes(event)
              }
            >
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="rounded-md border border-black p-2 text-[1.5rem]"
              />
              <textarea
                rows={10}
                placeholder="Enter content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="rounded-md border border-black p-2 text-[1.5rem]"
              ></textarea>

              {selectedNotes ? (
                <div className="flex gap-7">
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-3 py-1 rounded-md transition-all  ease-in duration-300 text-[2rem] hover:bg-red-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-600 text-white px-3 py-1 rounded-md transition-all  ease-in duration-300 text-[2rem] hover:bg-red-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-red-600 text-white px-3 py-1 rounded-md transition-all  ease-in duration-300 text-[2rem] hover:bg-red-500"
                >
                  Submit Note
                </button>
              )}
            </form>
          </div>

          <div className="flex flex-col justify-center md:flex-wrap gap-[2rem] h-screen">
            {notes.map((note) => (
              <div
                className="bg-[#FFFFFF] shadow-lg md:w-[40%] p-[2rem] rounded-md"
                key={note.title}
                onClick={() => handleNoteClicked(note)}
              >
                <div className="flex justify-end">
                  <button
                    className="cursor-pointer text-[2rem]"
                    onClick={(event) => deleteNotes(event, note.id)}
                  >
                    X
                  </button>
                  <h2></h2>
                </div>
                <h2 className="text-[2rem] mb-[3rem] font-bold uppercase">
                  {note.title}
                </h2>
                <p className="text-[1.5rem]">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
