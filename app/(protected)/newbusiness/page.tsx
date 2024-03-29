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
                                className="block min-w-20 w-72 h-12 border-2"
                                required
                            />
                        </label>
                        <button
                            formAction={addBuisness}
                            className="mx-auto  w-full h-12 text-white bg-blue-400 "
                        >
                            Add business
                        </button>
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

export default NewBusiness;
