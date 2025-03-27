import { Dialog } from "@headlessui/react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiImages } from "react-icons/bi";
import { toast } from "sonner";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../redux/Slices/api/taskApiSlice";
import { dateFormatter } from "../../utils";
// import { app } from "../../utils/cloud";
import Button from "../Button";
import Loading from "../Loading";
import ModalWrapper from "../ModalWrapper";
import SelectList from "../SelectList";
import Textbox from "../Textbox";
import UserList from "./UsersSelect";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

const uploadFileToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default"); // Replace with your Cloudinary preset
  formData.append("cloud_name", "dglzoqs9h"); // Replace with your Cloudinary cloud name

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/dglzoqs9h/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

const AddTask = ({ open, setOpen, task }) => {
  const defaultValues = {
    title: task?.title || "",
    date: dateFormatter(task?.date || new Date()),
    team: [],
    stage: "",
    priority: "",
    assets: [],
    description: "",
    links: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [team, setTeam] = useState(task?.team || []);
  const [priority, setPriority] = useState(task?.priority?.toUpperCase() || PRIORIRY[2]);
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const URLS = task?.assets ? [...task.assets] : [];

  const handleOnSubmit = async (data) => {
    setUploading(true);
    const uploadedFileURLs = await Promise.all([...assets].map(uploadFileToCloudinary));
    setUploading(false);

    const newData = {
      ...data,
      assets: [...URLS, ...uploadedFileURLs.filter(Boolean)],
      team,
      stage,
      priority,
    };

    try {
      const res = task?._id
        ? await updateTask({ ...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();

      toast.success(res.message);
      setTimeout(() => setOpen(false), 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };



  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title
          as='h2'
          className='text-base font-bold leading-6 text-gray-900 mb-4'
        >
          {task ? "UPDATE TASK" : "ADD TASK"}
        </Dialog.Title>

        <div className='mt-2 flex flex-col gap-6'>
          <Textbox
            placeholder='Task title'
            type='text'
            name='title'
            label='Task Title'
            className='w-full rounded'
            register={register("title", {
              required: "Title is required!",
            })}
            error={errors.title ? errors.title.message : ""}
          />
          <UserList setTeam={setTeam} team={team} />
          <div className='flex gap-4'>
            <SelectList
              label='Task Stage'
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />
            <SelectList
              label='Priority Level'
              lists={PRIORIRY}
              selected={priority}
              setSelected={setPriority}
            />
          </div>
          <div className='flex gap-4'>
            <div className='w-full'>
              <Textbox
                placeholder='Date'
                type='date'
                name='date'
                label='Task Date'
                className='w-full rounded'
                register={register("date", {
                  required: "Date is required!",
                })}
                error={errors.date ? errors.date.message : ""}
              />
            </div>
            <div className='w-full flex items-center justify-center mt-4'>
              <label htmlFor='imgUpload' className='cursor-pointer flex items-center gap-2'>
                <BiImages /> <span>Add Assets</span>
                <input type='file' id='imgUpload' className='hidden' multiple accept='image/*' onChange={(e) => setAssets(e.target.files)} />
              </label>
            </div>
          </div>

          <div className='w-full'>
            <p>Task Description</p>
            <textarea
              name='description'
              {...register("description")}
              className='w-full bg-transparent px-3 py-1.5 2xl:py-3 border border-gray-300
            dark:border-gray-600 placeholder-gray-300 dark:placeholder-gray-700
            text-gray-900 dark:text-white outline-none text-base focus:ring-2
            ring-blue-300'
            ></textarea>
          </div>

          <div className='w-full'>
            <p>
              Add Links{" "}
              <span className='text- text-gray-600'>
                seperated by comma (,)
              </span>
            </p>
            <textarea
              name='links'
              {...register("links")}
              className='w-full bg-transparent px-3 py-1.5 2xl:py-3 border border-gray-300
            dark:border-gray-600 placeholder-gray-300 dark:placeholder-gray-700
            text-gray-900 dark:text-white outline-none text-base focus:ring-2
            ring-blue-300'
            ></textarea>
          </div>
        </div>

        {isLoading || isUpdating || uploading ? (
          <div className='py-4'>
            <Loading />
          </div>
        ) : (
          <div className='bg-gray-50 mt-6 mb-4 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              label='Submit'
              type='submit'
              className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
            />

            <Button
              type='button'
              className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
