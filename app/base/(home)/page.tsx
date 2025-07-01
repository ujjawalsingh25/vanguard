import { Navbar } from "../_components/navbar";
import Base from "./base";


const BaseHomePage = () => {

    return (
        <>
            <Navbar />
            <div className="font-bold text-xl">
                <Base 
                    defaultLayout={[20,32,48]}
                    defaultCollapsed={false}
                    navCollapsedSize={4}
                />
            </div>
        </>
    );
};

export default BaseHomePage;