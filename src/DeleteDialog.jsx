const DeleteDialog = ({  setOpenDelete, deleteNote,deleteId}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl w-72">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Are you sure you want to delete this note?
        </h3>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-3 py-1 text-sm rounded bg-slate-200 dark:bg-slate-700"
            onClick={()=>setOpenDelete(false)}
          >
            Cancel
          </button>

          <button
            className="px-3 py-1 text-sm rounded bg-red-500 text-white"
            onClick={()=>deleteNote(deleteId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteDialog