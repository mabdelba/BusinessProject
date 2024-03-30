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
        redirect("/login");
    };
    return (
        <>
            <div className="w-full h-screen  relative ">
                <div id="navbar" className="h-20 fixed border-[1px] border-palette-sky w-full flex justify-between px-2 md:px-5 items-center">
                    <h1 className="w-fit font-Raleway font-bold text-palette-blue text-lg">{user.email}</h1>
                    <form action={logout} className="w-fit ">
                        <button className="  bg-palette-blue px-5 py-2 rounded-lg hover:scale-90 transtion-all duration-500 text-white">
                            Logout
                        </button>
                    </form>
                </div>
                <h1 className="mt-52 font-Raleway  text-xl md:text-2xl xl:text-5xl 2xl:text-7xl text-center font-bold">Welcome to Our Dashboard</h1>
                {children}
            </div>
        </>
    );
};

export default layout;
