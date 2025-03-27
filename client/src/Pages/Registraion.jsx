// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import Textbox from "../components/Textbox";
// import { useRegisterMutation } from "@/redux/Slices/userApiSlice";
// import { Button } from "@/components/ui/button";


// const Register = () => {
//   const navigate = useNavigate();
//   const [registerUser, { isLoading, error }] = useRegisterMutation();
//   const [apiError, setApiError] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const submitHandler = async (data) => {
//     try {
//       await registerUser(data).unwrap();
//       navigate("/log-in"); // Redirect to login page after registration
//     } catch (err) {
//       setApiError(err?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit(submitHandler)}
//         className=" bg-white p-6 rounded-lg shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

//         {apiError && <p className="text-red-500">{apiError}</p>}

//         <Textbox
//           label="Name"
//           placeholder="Enter your name"
//           register={register("name", { required: "Name is required" })}
//           error={errors.name?.message}
//         />

//         <Textbox
//           type="email"
//           label="Email"
//           placeholder="Enter your email"
//           register={register("email", { required: "Email is required" })}
//           error={errors.email?.message}
//         />

//         <Textbox
//           type="password"
//           label="Password"
//           placeholder="Enter password"
//           register={register("password", { required: "Password is required" })}
//           error={errors.password?.message}
//         />

//         <Textbox
//           label="Role"
//           placeholder="Enter your role"
//           register={register("role", { required: "Role is required" })}
//           error={errors.role?.message}
//         />

//         <Textbox
//           label="Title"
//           placeholder="Enter your title"
//           register={register("title", { required: "Title is required" })}
//           error={errors.title?.message}
//         />

//         <Button type="submit"  className="w-full mt-5" >{isLoading ? "Registering..." : "Register"}</Button>
//       </form>
//     </div>
//   );
// };

// export default Register;
