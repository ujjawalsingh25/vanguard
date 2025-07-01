import { Navbar } from "../_components/navbar";
import Commander from "./commander";


const CommanderHomePage = () => {

    return (
        <>
            <Navbar />
            <div className="font-bold text-xl">
                {/* <Commander 
                    defaultLayout={[20,32,48]}
                    defaultCollapsed={false}
                    navCollapsedSize={4}
                /> */}
            </div>
        </>
    );
};

export default CommanderHomePage;