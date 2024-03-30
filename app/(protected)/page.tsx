import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

const Dashboard = async () => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("business").select();
    if (error) console.log("errrrorrr", error);
    return (
        <>
            <div className="w-full h-auto mt-20   flex justify-center items-center px-5">
                <div className="gap-4 flex flex-col relative ">
                    <div className="w-full flex justify-end space-x-6 ">
                        <Link
                            href={"/newbusiness"}
                            className="bg-palette-green px-5 py-2 rounded-lg hover:scale-90 transtion-all duration-500 text-white "
                        >
                            New business
                        </Link>
                    </div>
                    <div className="grid grid-cols-4 gap-5 xl:gap-10 text-xs md:text-sm lg:text-base bg-palette-blue text-white px-4 py-3 rounded-md">
                        <h1 className=" ">Business Name</h1>
                        <h1 className="">Creator Email</h1>
                        <h1 className="-">Creation Date</h1>
                        <h1>Edit Business</h1>
                    </div>
                
     
                    {data?.map((obj, index) => (
                        <div
                            key={index}
                            className=" grid grid-cols-4  gap-5 xl:gap-10 text-[0.6rem] sm:text-xs md:text-sm lg:text-base border px-4 py-3 overflow-hidden"
                        >
                            <h1 className="truncate">{obj.name}</h1>
                            <h1 className="truncate ">{obj.email}</h1>
                            <h1 className="truncate">
                                {obj.created_at.toString().substring(0, 10)}
                            </h1>
                            <Link
                                href={`/updatebusiness/${obj.id}`}
                                className=" flex justify-center items-center h-full hover:scale-90 transition-all "
                            >
                                <FaRegEdit size={20} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
