import Input from "./Input";
import Button from './Button.jsx'
import {useRef} from "react";
import Modal from "./Modal.jsx";

export default function NewProject({onAdd,onCancel}){

    const modalRef = useRef();

    const title= useRef("");
    const description= useRef("");
    const date= useRef("");

    function handleSave(){
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDate = date.current.value;

        if (    enteredTitle.trim() === "" ||
                enteredDescription.trim() === "" ||
                enteredDate.trim() === ""  )
             {  modalRef.current.open();
                return;
             }     


        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            date: enteredDate
        });

    }

    return (
        <>
        <Modal ref={modalRef}>
        <h2 className="text-l font-bold text-red-500 py-2">Invalid Input</h2>
        <p className="text-l font-bold text-stone-500">Oops... looks like you forgot to enter a value</p>
        <p className="text-l font-bold text-stone-500 mb-3">Please make sure you enter every field</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center gap-4 justify-end">
                <li>
                    <button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button>
                </li>
                <li>
                    <button
                    className="px-4 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 hover:text-stone-100" 
                    onClick={handleSave}> Save </button>
                    
                </li>
            </menu>
            <div>
                <Input type='text' ref={title} text1='Title' type1='input'/>
                <Input ref={description} text1='Description' type1='textarea'/>
                <Input type='date' ref={date} text1='Due Date' type1='input'/>
            </div>
        </div>
        </>
    )
}