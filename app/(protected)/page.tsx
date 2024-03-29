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
            <div className="w-screen mt-20 h-[80vh]  flex justify-center items-center">
                <div className="gap-4 flex flex-col relative ">
                    <div className="w-full flex justify-end space-x-6 ">
                        <Link
                            href={"/newbusiness"}
                            className="bg-green-500 px-4 py-3 text-white font-medium "
                        >
                            New business
                        </Link>
                    </div>
                    <div className="grid grid-cols-4 gap-10 bg-blue-400 text-white px-4 py-3 rounded-md">
                        <h1>Business Name</h1>
                        <h1>Creator Email</h1>
                        <h1>Creation Date</h1>
                        <h1>Edit Business</h1>
                    </div>
                    {data?.map((obj, index) => (
                        <div
                            key={index}
                            className=" grid grid-cols-4  gap-10 border px-4 py-3"
                        >
                            <h1>{obj.name}</h1>
                            <h1>{obj.email}</h1>
                            <h1>
                                {obj.created_at.toString().substring(0, 10)}
                            </h1>
                            <Link
                                href={`/updatebusiness/${obj.id}`}
                                className=" flex justify-center items-center h-full hover:scale-90 transition-all "
                            >
                                <FaRegEdit size={25} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
