import { Logo } from "./_components/logo";

const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="h-full flex flex-col items-center justify-center bg-[#ffffff]" >
            <Logo />
            {children}
        </div>
    );
};

export default AuthLayout;