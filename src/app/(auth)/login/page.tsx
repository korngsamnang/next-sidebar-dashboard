import { LoginForm } from "@/app/(auth)/login/login-form";

export const metadata = {
    title: "Login | SDF Training Profile",
};

const Page = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <LoginForm />
        </div>
    );
};

export default Page;
