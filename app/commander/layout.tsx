import CommanderHomePage from "./(home)/page";
import { Navbar } from "./_components/navbar";

interface CommanderLayoutProps {
    children: React.ReactNode;
};


const CommanderLayout = ({children,}: CommanderLayoutProps) => {
    return (
        <>  
            <Navbar />
            <div className="flex flex-col h-full pt-[6.5%]">
                {children}
            </div>
        </>
    );
};

export default CommanderLayout;