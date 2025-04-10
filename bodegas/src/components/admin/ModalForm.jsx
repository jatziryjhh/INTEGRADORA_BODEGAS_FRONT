import React from "react";
export default function ModalForm({isOpen, onClose, mode, onSubmit}) {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      
      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
            <h3 className="font-bold text-lg py-4">
                {mode === 'edit' ? 'Editar' : 'Detalles'}
            </h3>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
              ✕
            </button>
            <button className="btn custom-bg">
                {mode === 'edit' ? 'Guardar cambios' : 'Agregar'}
            </button>
          </form>
          <label className="input">
  Path
  <input type="text" className="grow" placeholder="src/app/" />
  
</label>
        </div>
      </dialog>
    </>
  );
}
