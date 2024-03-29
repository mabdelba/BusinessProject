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
            console.log({ error });
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
            console.log(error)
            redirect(`/login?message=failed to sign up: ${error.message}`);
        }
        redirect("/");
    }

    return (
        <div>
            <form className="flex flex-col mt-80 space-y-4">
                <h1 className="mx-auto">Login</h1>
                <input type="email" name="email" className="border" />
                <input type="password" name="password" className="border" />
                <button className="bg-green-200" formAction={login}>Sign in</button>
                <button className="bg-green-500" formAction={signup}>Sign up</button>
            </form>
            {searchParams["message"] && <p>{searchParams["message"]}</p>}
        </div>
    );
};

export default Login;
