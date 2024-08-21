export default function Button({text1,...props}){
    return(
        <button className="px-4 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 hover:text-stone-100" {...props}>
            {text1}
        </button>
    )
}