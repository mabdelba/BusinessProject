import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const email = user?.email;

    const logout = async () => {
        "use server";

        const supabase = createClient();
        const { error } = await supabase.auth.signOut();
        if (error) {
          
          console.log(error);
        }
        redirect('/login');
    };

    const {data, error} = await supabase.from('business').select()
    if(data)console.log("data: ", data);
    if(error)console.log("errrrorrr", error)
    return (
        <>
            <div>Dashboard</div>
            <h1>hello : {email}</h1>
            <form action={logout}>
                <button className="fixed right-2 top-2 bg-blue-500 px-5 py-3 text-white">
                    Logout
                </button>
            </form>
            <div className="w-screen mt-20 h-[80%] border flex justify-center items-center">
            </div>
        </>
    );
};

export default Dashboard;
