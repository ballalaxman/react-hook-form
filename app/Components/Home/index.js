"use client";

import React, { useEffect, useState } from "react";
import classes from "./home.module.scss";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input";

const Hero = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobilenum: "",
    },
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.homeSection}>
      {isClient ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-white font-sans text-center mb-5">
            React Hook Form
          </h1>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="firstname"
                className="text-lg text-white font-mono"
              >
                First Name:
              </label>
              <input
                id="firstname"
                type="text"
                className="w-full px-4 bg-slate-900 border rounded-xl focus:outline-none mt-3 h-12 font-medium text-white font-mono"
                {...register("firstname", {
                  required: "This Field is Required",
                  minLength: { value: 3, message: "Too short!!" },
                })}
              />
              {errors?.firstname && (
                <p className="font-mono text-sm text-red-600 pt-3">
                  {errors.firstname && errors.firstname?.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="text-lg text-white font-mono"
              >
                last Name:
              </label>
              <input
                id="lastname"
                type="text"
                className="w-full px-4 bg-slate-900 border rounded-xl focus:outline-none mt-3 h-12 font-medium text-white font-mono"
                {...register("lastname", {
                  required: "This Field is requird",
                  maxLength: {
                    value: 10,
                    message: "Should be within 10 char!",
                  },
                })}
              />
              {errors?.lastname && (
                <p className="font-mono text-sm text-red-600 pt-3">
                  {errors?.lastname?.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="email" className="text-lg text-white font-mono">
                Email:
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 bg-slate-900 border rounded-xl focus:outline-none mt-3 h-12 font-medium text-white font-mono"
                {...register("email", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              {errors?.email && (
                <p className="font-mono text-sm text-red-600 pt-3">
                  {errors?.email?.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="mobilenum"
                className="text-lg text-white font-mono"
              >
                Mobile Num:
              </label>
              <Controller
                name="mobilenum"
                control={control}
                rules={{
                  validate: (value) => isValidPhoneNumber(`${value}`),
                }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    value={value}
                    onChange={onChange}
                    defaultCountry="IN"
                    id="mobilenum"
                    className="w-full px-4 bg-slate-900 border rounded-xl focus:outline-none mt-3 h-12 font-medium text-white font-mono"
                  />
                )}
              />
              {errors["mobilenum"] && (
                <p className="font-mono text-sm text-red-600 pt-3">
                  {errors?.mobilenum?.message || "Invalid Phone Number"}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="firstname"
                className="text-lg text-white font-mono"
              >
                First Name:
              </label>
              <input
                id="firstname"
                type="text"
                className="w-full px-4 bg-slate-900 border rounded-xl focus:outline-none mt-3 h-12 font-medium text-white font-mono"
                {...register("firstname", {
                  required: "This Field is Required",
                  minLength: { value: 3, message: "Too short!!" },
                })}
              />
              {errors?.firstname && (
                <p className="font-mono text-sm text-red-600 pt-3">
                  {errors.firstname && errors.firstname?.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="text-lg text-white font-mono"
              >
                last Name:
              </label>
              <input
                id="lastname"
                type="text"
                className="w-full px-4 bg-slate-900 border rounded-xl focus:outline-none mt-3 h-12 font-medium text-white font-mono"
                {...register("lastname", {
                  required: "This Field is requird",
                  maxLength: {
                    value: 10,
                    message: "Should be within 10 char!",
                  },
                })}
              />
              {errors?.lastname && (
                <p className="font-mono text-sm text-red-600 pt-3">
                  {errors?.lastname?.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md font-mono w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
          <DevTool control={control} />
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default Hero;
