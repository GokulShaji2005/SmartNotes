import React, { useState } from 'react';
import { X, Save, Tag, Hash } from 'lucide-react';

const NoteDialog = (
    { isCreate,setIsCreate,setNotes}
) => {
   const[title,setTitle]=useState('');
   const[content,setContent]=useState('');
   const[tag,setTag]=useState('');
  if (!isCreate) return null;
   
  const close=()=>setIsCreate(false);
  const addNote=(e)=>{
 
    e.preventDefault(); 

    if (!title.trim() || !tag.trim()) return; 
    const saveNotes={
        id:Date.now(),
        title:title,
        content:content,
        date:new Date().toLocaleString('en-GB'),
        isPin:false,
        tag:tag
    };

    setNotes(p=>[...p,saveNotes])
    close();
  }
  return (
    // Overlay (Backdrop)
     <form onSubmit={addNote}>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
     
      {/* Modal Panel */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-all">
        
        {/* Header */}
         
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-slate-700/50">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Create New Note
          </h2>
          <button 
            onClick={close}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6">
          
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Note Title
            </label>
            <input 
              type="text" 
              placeholder="e.g. Project Phoenix Requirements"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-white placeholder-slate-400 transition-all"
              onChange={(e)=>setTitle(e.target.value)}
              value={title}
              required
           />
          </div>

          {/* Paragraph (Content) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Content
            </label>
            <textarea 
              rows="5"
              placeholder="Write your thoughts here..."
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-white placeholder-slate-400 resize-none transition-all"
               onChange={(e)=>setContent(e.target.value)}
              value={content}
            ></textarea>
          </div>

          {/* Keywords / Tags Input UI */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Tag size={14} /> Keywords
            </label>
            <div className="flex flex-wrap gap-2 p-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
              
              {/* Fake Existing Tags (Visual Demo) */}
              {/* <span className="flex items-center gap-1 px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium">
                <Hash size={12} />
                Design
                <button className="hover:text-indigo-900 dark:hover:text-indigo-100 ml-1"><X size={12}/></button>
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium">
                <Hash size={12} />
                Urgent
                <button className="hover:text-purple-900 dark:hover:text-purple-100 ml-1"><X size={12}/></button>
              </span> */}

              {/* The Input Itself */}
              <input 
                type="text" 
                placeholder="Add keyword..." 
                className="flex-1 min-w-[100px] bg-transparent border-none focus:ring-0 p-1 text-slate-900 dark:text-white placeholder-slate-400 text-sm"
                value={tag}
                onChange={(e)=>setTag(e.target.value)}
                required/>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">Press Enter to create a tag</p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700/50 flex justify-end gap-3">
          <button 
            onClick={close}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-all transform active:scale-95"
           onClick={addNote}
          >
            <Save size={16} />

            Save Note
          </button>
        </div>

      </div>
    
    </div>
      </form>
  );
};

export default NoteDialog;