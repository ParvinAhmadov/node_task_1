"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRequestMutation } from "@/http/axiosFetcher";
import { CheckStatus } from "@/utils/CheckStatus";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const { trigger: loadData } = useRequestMutation("todos", {
    method: "GET",
    module: "devApi",
  });

  const {
    trigger: deleteTodo,
    isMutating: deleteMutating,
    error: DeleteError,
  } = useRequestMutation("deletetodo", {
    method: "DELETE",
    module: "devApi",
  });

  const handleDelete = async (id: any) => {
    try {
      await deleteTodo({ dynamicValue: id });
      loadData();
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await loadData();
        setData(response.data || []);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <button className="bg-red-100 text-red-600 rounded-md p-2">
        {error.message as string}
      </button>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex flex-col w-64 bg-[#308E87]">
        <div className="flex items-center justify-center h-16 bg-[#308E87]">
          <img
            src="https://admin.pixelstrap.net/admiro/assets/images/logo/logo1.png"
            alt="Logo"
          />
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-white">
            <h1 className="font-bold text-[#308E87] inline-block">PROJECT</h1>
            <Link href="/" className="flex items-center px-4 py-2 text-gray-900 transition-all ease duration-200 hover:bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              Project list
            </Link>
            <Link href="/projectcreate" className="flex items-center px-4 py-2 text-gray-900 transition-all ease duration-200 hover:bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Project Create
            </Link>
          </nav>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
            <button className="text-gray-500 focus:outline-none focus:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <input className="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search" />
          </div>
          <div className="flex items-center pr-4">
            <button className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l-7-7 7-7m5 14l7-7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
        <main className="p-4">
          {DeleteError && (
            <button className="bg-red-100 text-red-600 rounded-md p-2">
              {DeleteError.message as string}
            </button>
          )}
          {data.length === 0 && (
            <div className="flex p-3 rounded-md bg-blue-100 text-blue-500 justify-center items-center">
              <h1 className="text-xl font-bold">No data</h1>
            </div>
          )}
          <div className="flex flex-row my-5 justify-center flex-wrap gap-4">
            {data.map((todo: any, idx: number) => (
              <div
                className="max-w-[300px] p-4 w-full shadow-lg rounded-md bg-white"
                key={idx}
              >
                <h1 className="text-md font-bold max-w-[200px] line-clamp-2">
                  {todo.title}
                </h1>
                <p className="text-sm max-w-[300px]">{todo.description}</p>
                <div className="flex flex-col gap-2">
                  <div className="text-sm">Status: <span className={CheckStatus(todo.status)}>{todo.status}</span></div>
                  <div className="text-sm">Issues: {todo.issues}</div>
                  <div className="text-sm">Resolved: {todo.resolved}</div>
                  <div className="text-sm">Comments: {todo.comment}</div>
                  <div className="text-sm">Progress: {todo.progress}%</div>
                </div>
                <div className="flex justify-start items-center gap-2 mt-3">
                  <button
                    onClick={() => handleDelete(todo?._id)}
                    disabled={deleteMutating}
                    className="bg-red-100 disabled:bg-gray-300 disabled:cursor-not-allowed text-red-600 rounded-md p-3"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
