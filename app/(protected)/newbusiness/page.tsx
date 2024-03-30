import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

const NewBusiness = ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const addBuisness = async (formData: FormData) => {
        "use server";

        const supabase = createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user?.email) {
          throw new Error("unauthenticated");
        }

        const businessName = formData.get("name") as string;
        const { error } = await supabase
            .from("business")
            .insert({ email: user.email, name: businessName });

        if (error) {
            redirect("/newbusiness?message=failed to add business");
        }
        redirect("/?message=business added successfully!");
    };

    return (
        <div className="w-screen  h-[55vh]  flex justify-center items-center px-5 font-Raleway">
            <div className="gap-4 flex flex-col relative ">
                <div className="w-full flex flex-col items-end space-x-6 ">
                    <Link
                        href={"/"}
                        className="bg-palette-green px-5 py-2 rounded-lg hover:scale-90 transtion-all duration-500 text-white "
                    >
                        All businesses
                    </Link>
                    <form className="px-30  flex flex-col space-y-3 py-5">
                        <label htmlFor="name" className="font-Raleway">
                            Business Name
                            <input
                                id="name"
                                name="name"
                                className="bg-gray-200 w-full m text-gray-800 border border-palette-sky rounded-md p-2 my-2    focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-palette-blue transition ease-in-out duration-150"
                                required
                            />
                        </label>
                        <button
                            formAction={addBuisness}
                            className="bg-gradient-to-r bg-palette-blue text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-palette-sky hover:text-black transition-all ease-in-out duration-500"
                        >
                            Add business
                        </button>
                        <Link
                            href={'/'}
                            className="bg-gradient-to-r border text-black flex justify-center font-bold py-2 px-4 rounded-md mt-4 hover:bg-palette-beige transition-all ease-in-out duration-500"
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

export default NewBusiness;
