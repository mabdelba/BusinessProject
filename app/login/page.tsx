import ToastError from "@/components/toast/ToastError";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type T = { searchParams: Record<string, string> };

const Login = ({ searchParams }: T) => {
    async function login(formData: FormData) {
        "use server";

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            redirect(`/login?message=failed to sign in: ${error.message}`);
        }
        redirect("/");
    }

    async function signup(formData: FormData) {
        "use server";

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error) {
            redirect(`/login?message=failed to sign up: ${error.message}`);
        }
        redirect("/");
    }

    return (
        <div className="w-screen h-screen flex  justify-center items-center font-Raleway ">
            <form className="flex flex-col border p-5 md:p-10  xl:p-20 min-w-[20rem] w-1/2 max-w-[30rem] rounded-2xl">
                <h1 className="text-btn-palette-green text-2xl mb-8 font-extrabold ">
                    Login page{" "}
                </h1>
                <input
                    name="email"
                    placeholder="Email"
                    className="bg-gray-100 w-full text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-palette-blue transition ease-in-out duration-150"
                    type="email"
                    required
                />
                <input
                    name="password"
                    placeholder="Password"
                    className="bg-gray-100 w-full text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-palette-blue transition ease-in-out duration-150"
                    type="password"
                    required
                />
                <button
                    formAction={login}
                    className="bg-gradient-to-r bg-palette-blue text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-palette-sky hover:text-black transition-all ease-in-out duration-500"
                    type="submit"
                >
                    Sign-in
                </button>
                <button
                    formAction={signup}
                    className="bg-gradient-to-r border text-black  font-bold py-2 px-4 rounded-md mt-4 hover:bg-palette-beige transition-all ease-in-out duration-500"
                    type="submit"
                >
                    Sign-up
                </button>
                {searchParams["message"] && (
                    <p className="mt-2 md:mt-3 text-red-400">
                        {searchParams["message"]}
                    </p>
                )}
            </form>
        </div>
    );
};

export default Login;
