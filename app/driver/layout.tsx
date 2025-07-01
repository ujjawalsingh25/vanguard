import BaseHomePage from "./(home)/page";
import { Navbar } from "./_components/navbar";

interface IndivisualLayoutProps {
    children: React.ReactNode;
};


const IndivisualLayout = ({children,}: IndivisualLayoutProps) => {
    return (
        <>  
            <Navbar />
            <div className="flex flex-col h-full pt-[6.5%]">
                {children}
            </div>
        </>
    );
};

export default IndivisualLayout;