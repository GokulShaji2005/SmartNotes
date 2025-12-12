import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Moon, 
  Sun, 
  Plus, 
 
  Tag, 
  XIcon
} from 'lucide-react';
import NoteCard from './NoteCard';
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';
// --- Sub-Component: Note Card ---
// Represents a single note in the grid

import NoteDialog from './Dialog';
// --- Main Layout Component ---
const SmartNotesLayout = () => {
  // Simple state for visual toggle demonstration
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [drop, setdrop] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editOpen,setEditOpen]=useState(false);
  const [editNote,setEditNote]=useState(null);

  const [notes,setNotes]=useState(() => {
  const saved = JSON.parse(localStorage.getItem("notes"));
  return saved || [];
});
  const[search,setSearch]=useState('');
  const [deleteId, setDeleteId] = useState(null);
 

 
    const filterTitle=notes.filter(note=>
      note.title.toLowerCase().includes(search.toLowerCase())
    )



  

  const open=()=> setIsCreate(true);
 
  
  const PinNote=(id)=>{
    setNotes(prev=>{

    const PinUpdate=prev.map(note=>{
      if(note.id===id){
        return{...note,isPin:!note.isPin}
      }
      else{
        return note
      }

    
    });
   
   
    return PinUpdate;

    
    });
    setNotes(prev=>{
      const sortPin=[...prev].sort((a,b)=>b.isPin-a.isPin);
      
      localStorage.setItem("notes",JSON.stringify(sortPin));
      return sortPin;
    })

  }
  const oldSort = () => {
  setNotes(prev => {
    const newUpdate = [...prev].sort((a, b) => {
      // 1️⃣ Pinned notes always come first
      if (a.isPin !== b.isPin) {
        return a.isPin ? -1 : 1;
      }

      // 2️⃣ Sort by OLDEST (ascending)
      return new Date(b.date) - new Date(a.date);
    });

    localStorage.setItem("notes", JSON.stringify(newUpdate));
    return newUpdate;
  });

  setdrop(prev => !prev);
};

const newSort = () => {
  setNotes(prev => {
    const newUpdate = [...prev].sort((a, b) => {
      if (a.isPin !== b.isPin) {
        return a.isPin ? -1 : 1;
      }
      return new Date(a.date) - new Date(b.date); // newest first
    });

    localStorage.setItem("notes", JSON.stringify(newUpdate));
    return newUpdate;
  });

  setdrop(prev => !prev);
};



useEffect(()=>{  
 
  localStorage.setItem("notes",JSON.stringify(notes));


},[notes])



  const deleteNote=(id)=>{
    setNotes(prev=>{

    const deleteUpdate=prev.filter(n=>n.id!=id);
   
    localStorage.setItem("notes",JSON.stringify(deleteUpdate));
    return deleteUpdate;
    });
setOpenDelete(false);
  }

  const updateNote=(update)=>{
    const latest=notes.map(n=>n.id===update.id?update:n);
    setNotes(latest);
      localStorage.setItem("notes", JSON.stringify(latest));
  }
  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 ease-in-out font-sans">
        
        {/* --- Top Navigation & Controls --- */}
        <div className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            
            {/* Top Row: Title and Theme Toggle */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Tag className="text-white" size={18} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Smart<span className="text-indigo-600">Notes</span>
                </h1>
              </div>

              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Bottom Row: Search Bar (As requested, under the title) */}
            <div className="relative max-w-2xl mx-auto pb-2">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" 
                  />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
                  placeholder="Search your notes..."
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                />
                {/* <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 text-xs border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">⌘K</span>
                </div> */}

                 <div
    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
    onClick={() => setdrop((prev) => !prev)}
  >
    <span className="text-slate-400 text-xs border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">
      ⌘S
    </span>
  </div>

  {/* Dropdown */}
  {drop && (
    <div className="absolute right-0 mt-2 w-40 font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-2 z-50"

    >
      <button className="w-full text-left px-1 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
      onClick={newSort}>
         Newest
      </button>
      <button className="w-full text-left px-1 py-0.5  hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
      onClick={oldSort}
      >
        Oldest 
      </button>
    </div>
  )}
              </div>
            </div>

          </div>
        </div>

        {/* --- Main Content Grid --- */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Section Label */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Recent Notes
            </h2>
            {/* <span className="text-xs text-slate-400">{notes.length} notes found</span> */}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {/* Create New Card (First item) */}
            <div className="group border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all duration-200"
            onClick={open}
            >
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Plus className="text-indigo-600 dark:text-indigo-400" size={24} />
              </div>
              <p className="font-medium text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Create New Note</p>
            </div>
          
            {/* Render Mock Notes */}
            {/* {notes.map((note) => (
              <NoteCard key={note.id} title={note.title} content={note.content} date={note.date}
              note={note}
              deleteNote={deleteNote} PinNote={PinNote} isPin={note.isPin} tag={note.tag} />
            ))} */}


      {/* filtering NoteCard using search */}
               {filterTitle && filterTitle.map((note) => (
              <NoteCard key={note.id} title={note.title} content={note.content} date={note.date}
              note={note}
              deleteNote={deleteNote} PinNote={PinNote} isPin={note.isPin} tag={note.tag} setOpenDelete={setOpenDelete}
              setdeleteId={setDeleteId}
              
              onEdit={()=>{
                setEditNote(note);
                setEditOpen(true);
              }}
              
              />
            ))}
          </div>
        {isCreate?<NoteDialog isCreate={isCreate} setIsCreate={setIsCreate}
        notes={notes} setNotes={setNotes} 
        />:null}
 {openDelete && (<DeleteDialog openDelete={openDelete} setOpenDelete={setOpenDelete} deleteNote={deleteNote}
 deleteId={deleteId}
 
 />)}

 {editOpen && (<EditDialog updateNote={updateNote} editNote={editNote} editOpen={editOpen} seteditOpen={setEditOpen}/>)}
        </main>
      </div>
    </div>
  );
};

export default SmartNotesLayout;