import React, { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: ReactNode }) => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }
    const logout = async () => {
        "use server";

        const supabase = createClient();
        const { error } = await supabase.auth.signOut();
        if (error) {
          
          console.log(error);
        }
        redirect('/login');
    };
    return (
        <>
            <div>Dashboard</div>
            <h1>hello : {user.email}</h1>
            <form action={logout}>
                <button className="fixed right-2 top-2 bg-blue-500 px-5 py-3 text-white">
                    Logout
                </button>
            </form>
            {children}
        </>
    );
};

export default layout;
