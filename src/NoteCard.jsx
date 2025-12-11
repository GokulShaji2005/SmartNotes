
import { 

  MoreVertical,
  Pin ,
  Calendar, 
  Trash,
  PenSquare
 
} from 'lucide-react';
import NoteDialog from './Dialog';
// import { useState} from 'react';

const NoteCard = ({ title, date, tag, content ,deleteNote,note,PinNote,isPin}) => {
 


    return(
  <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300  flex flex-col justify-between h-64">
    
    {/* Header */}
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">
        {title}
      </h3>
     
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 "
          onClick={()=>PinNote(note.id)}
       >
        {isPin?<Pin size={18} className='fill-amber-100' />:<Pin size={18}  />}
        
          
      </button>
    </div>

    {/* Body Preview */}
    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-4 mb-4">
      {content}
    </p>

    {/* Footer Metadata */}
    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
     

           
              
     {tag && ( <span className="flex items-center gap-1 px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium">
                     {tag}</span>
                )}
            
      <div className="flex items-center text-slate-400 text-xs">
       <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 "
       >
        {/* <MoreVertical size={18}  /> */}
           <Trash size={18} className="mr-3" onClick={()=>deleteNote(note.id)} 
           />
      </button>
       <button className="text-slate-400  dark:hover:text-slate-200 ">
   
           <PenSquare size={18} className="mr-3" />
      </button>
         
        <Calendar size={14} className="mr-1.5" />
       
        {date}
      </div>
    </div>
  </div>
);
}
export default NoteCard