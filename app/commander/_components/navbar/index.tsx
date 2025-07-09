
import { ToggleSignin } from "./actions";
import { Logo } from "./logo";

export const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full h-[12%] z-[49] bg-[#252731] 
        px-2 py-2 lg:px-4 flex justify-between items-center shadow-sm" >
            <Logo />
            {/* <div className="bg-amber-700 p-2 rounded-3xl">Option 1</div>
            <div className="bg-amber-700 p-2 rounded-3xl">Option 2</div>
            <div className="bg-amber-700 p-2 rounded-3xl">Option 3</div> */}
            <form className='flex flex-row  p-6 justify-center'>
                <input 
                    className='bg-white font-bold text-gray-700 px-8 rounded-2xl 
                    rounded-tl-4xl rounded-bl-2xl rounded-tr-2xl rounded-br-4xl' 
                    placeholder='Search Vehicle'
                /> 
                <button type='submit' 
                    className='outline-none rounded-sm bg-[#2f72ed] text-white font-bold shadow-lg px-2 py-2 
                    transition-all duration-100 hover:bg-[#1d5cd0] hover:shadow-xl rounded-tl-4xl rounded-bl-2xl 
                    rounded-tr-2xl rounded-br-4xl'
                >
                    Search
                </button>
            </form>
            <ToggleSignin />
        </nav>
    );
};