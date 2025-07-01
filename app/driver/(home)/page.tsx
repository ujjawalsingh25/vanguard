import IndivisualVehicle from "./indivisual";
import { Navbar } from "../_components/navbar";


const IndivisualHomePage = () => {

    return (
        <>
            <Navbar />
            <div className="font-bold text-xl">
                <IndivisualVehicle 
                    defaultLayout={[20,32,48]}
                    defaultCollapsed={false}
                    navCollapsedSize={4}
                />
            </div>
        </>
    );
};

export default IndivisualHomePage;