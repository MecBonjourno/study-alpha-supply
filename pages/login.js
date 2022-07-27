import Link from "next/link";

import { getSession } from "next-auth/react";
import React, { useEffect, useContext } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Store } from "../utils/Store";

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  // useEffect(() => {
  //   if (session?.user) {
  //     router.push(redirect || "/");
  //   }
  // }, [router, session, redirect]);

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // const { data: token } = useSession();
  // console.log("Token??: " + token);

  const submitHandler = async ({ email, password }) => {
    try {
      const session = await getSession();
      console.log("session: " + JSON.stringify(session));
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log(result);
      dispatch({ type: "USER_LOGIN", payload: result });
      Cookies.set("userInfo", JSON.stringify(result));
      router.push(redirect || "/");

      if (result.error) {
        // toast.error(result.error);
        console.log(result.error);
      }
    } catch (err) {
      getError(err);
    }
  };
  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: { value: 6, message: "password is more than 5 chars" },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4 ">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${redirect || "/"}`}>Register</Link>
        </div>
      </form>
    </Layout>
  );
}
