import BaseHomePage from "./(home)/page";
import { Navbar } from "./_components/navbar";

interface RoomLayoutProps {
    children: React.ReactNode;
};


const RoomLayout = ({children,}: RoomLayoutProps) => {
    return (
        <>  
            <Navbar />
            <div className="flex flex-col h-full pt-[6.5%]">
                {children}
            </div>
        </>
    );
};

export default RoomLayout;