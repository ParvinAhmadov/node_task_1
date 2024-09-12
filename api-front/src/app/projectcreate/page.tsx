"use client";

import { useState } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useRequestMutation } from "@/http/axiosFetcher";
import { CheckStatus } from "@/utils/CheckStatus";

const ProjectCreate = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    issues: "",
    resolved: "",
    comment: "",
    progress: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const {
    trigger,
    isMutating,
    error: createTodoError,
  } = useRequestMutation("todos", {
    method: "POST",
    module: "devApi",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await trigger({ body: form }).then((res) => {
        toast.success(res.message);
        setForm({
          title: "",
          description: "",
          status: "pending",
          issues: "",
          resolved: "",
          comment: "",
          progress: "",
        });
      });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto p-4">
      <div className="max-w-[500px] mx-auto my-5">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            className="p-3 rounded-md w-full border-2 border-gray-300 outline-none"
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={form.title}
          />
          <input
            className="p-3 rounded-md w-full border-2 border-gray-300 outline-none"
            type="text"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={form.description}
          />
          <select
            className="p-3 rounded-md w-full outline-none border-2 border-gray-300"
            name="status"
            id="status"
            onChange={handleChange}
            value={form.status}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
          <input
            className="p-3 rounded-md w-full border-2 border-gray-300 outline-none"
            type="number"
            placeholder="Issues"
            name="issues"
            onChange={handleChange}
            value={form.issues}
          />
          <input
            className="p-3 rounded-md w-full border-2 border-gray-300 outline-none"
            type="number"
            placeholder="Resolved"
            name="resolved"
            onChange={handleChange}
            value={form.resolved}
          />
          <input
            className="p-3 rounded-md w-full border-2 border-gray-300 outline-none"
            type="number"
            placeholder="Comments"
            name="comment"
            onChange={handleChange}
            value={form.comment}
          />
          <input
            className="p-3 rounded-md w-full border-2 border-gray-300 outline-none"
            type="number"
            placeholder="Progress"
            name="progress"
            onChange={handleChange}
            value={form.progress}
          />
          <button
            disabled={isMutating}
            className="bg-green-100 flex justify-center items-center disabled:bg-gray-300 disabled:cursor-not-allowed w-full text-green-600 rounded-md p-2"
            type="submit"
          >
            {isMutating ? (
              <div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-2 border-t-blue-600" />
            ) : (
              "Create"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectCreate;
