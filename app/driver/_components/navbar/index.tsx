
import { ToggleSignin } from "./actions";
import { Logo } from "./logo";

export const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full h-[12%] z-[49] bg-[#252731] 
        px-2 py-2 lg:px-4 flex justify-between items-center shadow-sm" >
            <Logo />
            <div className="bg-amber-700 p-2 rounded-3xl">Option 1</div>
            <div className="bg-amber-700 p-2 rounded-3xl">Option 2</div>
            <div className="bg-amber-700 p-2 rounded-3xl">Option 3</div>
            <div className="bg-amber-700 p-2 rounded-3xl">Option 4</div>
            <ToggleSignin />
        </nav>
    );
};