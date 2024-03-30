import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const UpdateBusiness = async ({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: Record<string, string>;
}) => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
        .from("business")
        .select()
        .eq("id", params.id);

    const business = data?.[0];

    if (!business || !user || business.email !== user.email) {
        redirect("/");
    }

    const editBusiness = async (formData: FormData) => {
        "use server";
        const supabase = createClient();
        const newName = formData.get("name") as string;
        const { error } = await supabase
            .from("business")
            .update({ name: newName })
            .eq("id", params.id);

        if (error) {
            console.log({ error });
            redirect(`/updatebusiness/${params.id}?message=${error.message}`);
        }
        redirect("/");
    };

    const deleteBusiness = async () => {
        "use server";

        const supabase = createClient();
        const { error } = await supabase
            .from("business")
            .delete()
            .eq("id", params.id);
        if (error) {
            console.log("error", error);
            redirect(`/updatebusiness/${params.id}?message=${error.message}`);
        }
        redirect("/");
    };

    return (
        <div className="w-screen mt-20 h-[50vh]  flex justify-center items-center font-Raleway pr-5">
            <div className="gap-4 flex flex-col relative ">
                <div className="w-full flex flex-col items-end space-x-6 ">
                    <Link
                        href={"/"}
                        className="bg-palette-green px-5 py-2 rounded-lg hover:scale-90 transtion-all duration-500 text-white "
                    >
                        All businesses
                    </Link>
                    <form className="px-30  flex flex-col space-y-3 py-4">
                        <label htmlFor="name">
                            Business Name
                            <input
                                id="name"
                                name="name"
                                placeholder={business.name}
                                className="bg-gray-200 w-full m text-gray-800 border border-palette-sky rounded-md p-2 my-2   focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-palette-blue transition ease-in-out duration-150"
                            />
                        </label>
                        <div className="w-full h-12 flex justify-between space-x-3 ">
                            <button
                                formAction={editBusiness}
                                className="bg-gradient-to-r bg-palette-blue text-white font-bold py-2 px-4 rounded-md  hover:bg-palette-sky hover:text-black transition-all ease-in-out duration-500 w-1/2 h-full"
                            >
                                Save
                            </button>
                            <button
                                formAction={deleteBusiness}
                                className="  bg-gradient-to-r bg-red-400 text-white font-bold py-2 px-4 rounded-md  hover:bg-red-300  transition-all ease-in-out duration-500 w-1/2 h-full"
                            >
                                Delete
                            </button>
                        </div>
                        <Link
                            href={'/'}
                            className="bg-gradient-to-r border text-black flex justify-center font-bold py-2 px-4 rounded-md  hover:bg-palette-beige transition-all ease-in-out duration-500"
                        >
                            Cancel
                        </Link>
                        {searchParams["message"] && (
                            <span className="text-red-700">
                                {searchParams["message"]}
                            </span>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateBusiness;
