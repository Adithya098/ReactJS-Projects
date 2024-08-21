import React, { forwardRef, useImperativeHandle,useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button.jsx'

const Modal = forwardRef(function Modal({ children }, ref) {
  
    // Use useImperativeHandle to expose methods to the parent component
  
    const dialog = useRef();


    useImperativeHandle(ref, () => ({
        open() {
        // Implementation for open method
        dialog.current.showModal();
        }
    }));

    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form method='dialog'>
                <Button text1={'Okay Boss'}/>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    );
});

export default Modal;
