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
        <div className="w-screen mt-20 h-[80vh]  flex justify-center items-center">
            <div className="gap-4 flex flex-col relative ">
                <div className="w-full flex flex-col items-end space-x-6 ">
                    <Link
                        href={"/"}
                        className="bg-green-500 px-4 py-3 text-white font-medium "
                    >
                        All businesses
                    </Link>
                    <form className="px-30  flex flex-col space-y-3 py-5">
                        <label htmlFor="name">
                            Business Name
                            <input
                                id="name"
                                name="name"
                                placeholder={business.name}
                                className="block min-w-20 w-72 h-12 border-2 px-3"
                            />
                        </label>
                        <div className="w-full h-12 flex justify-between space-x-3 ">
                            <button
                                formAction={editBusiness}
                                className="  w-1/2 h-full text-white bg-blue-400 "
                            >
                                Save
                            </button>
                            <button
                                formAction={deleteBusiness}
                                className="  w-1/2 h-full text-white bg-red-600 "
                            >
                                Delete
                            </button>
                        </div>
                        <button
                            type="reset"
                            className="mx-auto  w-full h-12 text-black bg-blue-200 "
                        >
                            Cancel
                        </button>
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
