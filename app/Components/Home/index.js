"use client";
import React, { useEffect, useState } from "react";
import classes from "./home.module.scss";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input";
import { Chip, MenuItem, Select, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

const names = [
  "Telugu",
  "kannada",
  "Tamil",
  "Malayalam",
  "Urdu",
  "Panjabi",
  "Marathi",
  "Bangali",
];

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
      dob: "",
      gender: "",
      languages: [],
      address: {
        hometown: "",
        city: "",
        state: "",
        postalcode: "",
      },
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
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
          <h1 className="text-white font-sans text-center mb-5">
            React Hook Form
          </h1>
          <div className="grid gap-6 mb-4 md:grid-cols-2">
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
                <p className="font-mono text-sm text-red-600 pt-1">
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
                <p className="font-mono text-sm text-red-600 pt-1">
                  {errors?.lastname?.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-6 mb-4 md:grid-cols-2">
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
                <p className="font-mono text-sm text-red-600 pt-1">
                  {errors?.email?.message}
                </p>
              )}
            </div>
            {/* Phone number control with validation */}
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
              <p className="font-mono text-sm text-red-600 pt-1">
                {errors.mobilenum &&
                  (errors?.mobilenum?.message || "Invalid Number")}
              </p>
            </div>
          </div>

          <div className="grid gap-6 mb-4 md:grid-cols-2">
            {/* Mui select for gender  */}
            <div>
              <label htmlFor="gender" className="text-lg text-white font-mono">
                Gender:
              </label>
              <Controller
                name="gender"
                defaultValue=""
                control={control}
                rules={{ required: "Choose any one option" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{
                      color: "#fff",
                      fontFamily: "sans",
                      borderRadius: "0.75rem",
                      "&:focus": {
                        border: "none",
                        outline: "none",
                      },
                    }}
                    className="w-full bg-slate-900 border rounded-xl focus:outline-none mt-3 h-12 font-medium text-white font-mono"
                  >
                    <MenuItem value="male" className="text-white">
                      Male
                    </MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                )}
              />
              {errors?.gender && (
                <p className="font-mono text-sm text-red-600 pt-1">
                  {errors.gender && errors.gender?.message}
                </p>
              )}
            </div>
            {/* Mui Datepicker */}
            <div>
              <label htmlFor="dob" className="text-lg text-white font-mono">
                Date of Birth:
              </label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  control={control}
                  defaultValue=""
                  name="dob"
                  rules={{
                    required: "PLese select your DateofBirth",
                    valueAsDate: true,
                  }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      disableFuture
                      format="DD/MM/YYYY"
                      sx={{
                        width: "100%",
                        border: "1px solid #fff",
                        padding: "0px",
                        color: "#fff",
                        borderRadius: "0.75rem",
                        mt: 1.5,
                        backgroundColor: "#0f172a",
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              {errors?.dob && (
                <p className="font-mono text-sm text-red-600 pt-1">
                  {errors?.dob?.message}
                </p>
              )}
            </div>
          </div>

          {/* Multiple Select  */}
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="languages"
                className="text-lg text-white font-mono"
              >
                Languages known:
              </label>
              <Controller
                control={control}
                name="languages"
                defaultValue={[]}
                rules={{
                  required: "Select any 3 langauges",
                  validate: (value) =>
                    value.length <= 3 || "Select any 3 languages only",
                }}
                render={({ field }) => (
                  <Select
                    multiple
                    {...field}
                    className="w-full bg-slate-900 border rounded-xl focus:outline-none mt-3 font-medium text-white font-mono"
                    sx={{
                      color: "#fff",
                      fontFamily: "sans",
                      borderRadius: "0.75rem",
                      height: "50px",
                      "&:focus": {
                        border: "none",
                        outline: "none",
                      },
                    }}
                    renderValue={(selected) => (
                      <Stack
                        gap={1}
                        direction="row"
                        flexWrap="wrap"
                        sx={{ width: "90%" }}
                      >
                        {selected.map((value) => (
                          <Chip
                            sx={{
                              color: "#1b1b1b",
                              background: "lightGrey",
                              fontFamily: "sans",
                            }}
                            key={value}
                            label={value}
                            onDelete={() =>
                              field.onChange(
                                field.value.filter((item) => item !== value)
                              )
                            }
                            deleteIcon={
                              <CancelIcon
                                onMouseDown={(event) => event.stopPropagation()}
                              />
                            }
                          />
                        ))}
                      </Stack>
                    )}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        sx={{ justifyContent: "space-between" }}
                      >
                        {name}
                        {field.value.includes(name) ? (
                          <CheckIcon color="info" />
                        ) : null}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors?.languages && (
                <p className="font-mono text-sm text-red-600 pt-1">
                  {errors?.languages?.message}
                </p>
              )}
            </div>
            <div />
          </div>

          <div className="grid gap-6 mb-3 md:grid-cols-2 mt-8">
            <div>
              <label
                htmlFor="hometown"
                className="text-lg text-white font-mono"
              >
                Home Town:
              </label>
              <input
                id="hometown"
                type="text"
                className="w-full px-4 bg-slate-900 border rounded-xl focus:outline-none mt-3 h-12 font-medium text-white font-mono"
                {...register("address.hometown")}
              />
              {errors?.address?.hometown && (
                <p className="font-mono text-sm text-red-600 pt-1">
                  {errors.address?.hometown &&
                    errors.address?.hometown?.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="city" className="text-lg text-white font-mono">
                City:
              </label>
              <input
                id="city"
                type="text"
                className="w-full px-4 bg-slate-900 border rounded-xl focus:outline-none mt-3 h-12 font-medium text-white font-mono"
                {...register("address.city")}
              />
              {errors?.address?.city && (
                <p className="font-mono text-sm text-red-600 pt-1">
                  {errors.address?.city && errors.address?.city?.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-2 ">
            <div>
              <label htmlFor="state" className="text-lg text-white font-mono">
                State:
              </label>
              <input
                id="state"
                type="text"
                className="w-full px-4 bg-slate-900 border rounded-xl focus:outline-none mt-3 h-12 font-medium text-white font-mono"
                {...register("address.state")}
              />
              {errors?.address?.state && (
                <p className="font-mono text-sm text-red-600 pt-1">
                  {errors.address?.state && errors.address?.state?.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="postalcode"
                className="text-lg text-white font-mono"
              >
                Postalcode:
              </label>
              <input
                id="postalcode"
                type="number"
                placeholder="000XXX"
                className="w-full px-4 bg-slate-900 border rounded-xl focus:outline-none mt-3 h-12 font-medium text-white font-mono"
                {...register("address.postalcode", {
                  validate: () => {},
                  maxLength: { value: 6, message: "Invalid pin code" },
                  minLength: { value: 6, message: "Invalid pin code" },
                })}
              />
              {errors?.address?.postalcode && (
                <p className="font-mono text-sm text-red-600 pt-1">
                  {errors.address?.postalcode &&
                    errors.address?.postalcode?.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex">
            <button
              type="submit"
              className="w-1/2 m-auto bg-blue-500 text-white py-3 mt-3 rounded-xl font-mono text-xl shadow-xl"
            >
              Submit
            </button>
          </div>
          <DevTool control={control} />
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default Hero;
