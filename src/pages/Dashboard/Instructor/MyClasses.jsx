import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { BiDollarCircle } from "react-icons/bi";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { ScaleLoader } from "react-spinners";

const MyClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], isLoading } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure(`/instructor/classes/${user?.email}`);
      return res.data;
    },
  });

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-5">
        Total Classes: {classes.length}
      </h3>
      {isLoading ? (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
          <ScaleLoader color="#72deed" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-8">
          {classes.map((item) => (
            <div
              key={item._id}
              className={`card w-full bg-base-100 shadow-xl ${
                item?.status === "denied" && "border-2 border- border-rose-500"
              }`}
            >
              <div
                className="h-60 w-full bg-cover bg-center rounded-t-2xl"
                style={{ backgroundImage: `url('${item.image}')` }}
              >
                <div
                  className={`px-3 py-1 mt-2 ml-2 rounded-full w-fit shadow-md text-white font-medium uppercase ${
                    item.status === "pending"
                      ? "bg-amber-500"
                      : item.status === "approved"
                      ? "bg-green-500"
                      : item.status === "denied"
                      ? "bg-rose-500"
                      : ""
                  }`}
                >
                  {item.status}
                </div>
              </div>
              <div className="card-body p-5">
                <h2 className="card-title">{item.name}</h2>
                <div className="card-actions justify-between mt-auto">
                  <div className="flex gap-3">
                    <p className="flex gap-1 items-center bg-gray-200 rounded-full pr-2">
                      <MdOutlinePeopleOutline className="text-3xl bg-gray-500 p-1 rounded-full text-white" />{" "}
                      <span className="text-xl font-semibold">
                        {item?.seats}
                      </span>
                    </p>
                    <p className="flex gap-1 items-center bg-gray-200 rounded-full pr-2">
                      <BiDollarCircle className="text-3xl bg-gray-500 p-1 rounded-full text-white" />{" "}
                      <span className="text-xl font-semibold">
                        {item?.price}
                      </span>
                    </p>
                  </div>
                  {item?.feedback ? (
                    <div>
                      <button
                        className="btn btn-outline btn-sm rounded-full"
                        onClick={() => openModal(`my_modal_${item._id}`)}
                      >
                        <FiAlertCircle className="text-xl" /> Feedback
                      </button>
                      <dialog id={`my_modal_${item._id}`} className="modal">
                        <form method="dialog" className="modal-box">
                          <button
                            htmlFor={`my_modal_${item._id}`}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={() => {
                              const modal = document.getElementById(
                                `my_modal_${item._id}`
                              );
                              if (modal) {
                                modal.close();
                              }
                            }}
                          >
                            ✕
                          </button>
                          <h3 className="font-bold text-lg">Admin Messages!</h3>
                          <p className="py-4">{item.feedback}</p>
                        </form>
                      </dialog>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-auto">
                  <hr />
                  <div className="flex flex-wrap gap-3 mt-3">
                    <button className="btn btn-accent btn-sm">
                      {" "}
                      <FaEdit />
                      Update
                    </button>
                    <button className="btn btn-error btn-sm">
                      {" "}
                      <FaTrashAlt />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyClasses;
