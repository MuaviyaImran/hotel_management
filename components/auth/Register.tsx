"use client";

import { useRegisterMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";
import InfoBox from "../InfoBox";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const router = useRouter();

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      router.push("/login");
      toast.success("Register success");
    }
  }, [error, isSuccess]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
    };

    register(userData);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={handleSubmit}>
            <h2 className="mb-4">Join Us</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                {" "}
                Full Name{" "}
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email_field">
                {" "}
                Email{" "}
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password_field">
                {" "}
                Password{" "}
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="btn form-btn w-100 py-2">
              {isLoading ? <ButtonLoader /> : "Register"}
            </button>
            <div className="mt-3 mb-4">
              <a href="/login" className="float-end">
                {" "}
                Already have an acount? Login Here
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="row wrapper w-50 mx-auto">
        <InfoBox />
      </div>
    </>
  );
};
export default Register;
