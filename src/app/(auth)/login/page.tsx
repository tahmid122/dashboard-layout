/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomButton from "@/components/shared/CustomButton";
import { Spinner } from "@/components/ui/spinner";
import { useCreateAdminLoginMutation } from "@/store/features/auth/authApi";
import { setUser } from "@/store/features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoginFormData, loginSchema } from "@/validation/LoginZod";
import { useAppDispatch } from "@/store/hookts";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
const Login = () => {
  // lang
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loginUser, { isLoading, isError }] = useCreateAdminLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser(data).unwrap();

      // Dispatch to Redux
      dispatch(
        setUser({
          accessToken: res.data.accessToken,
          user: {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
          },
          id: res.data.id,
        }),
      );

      // Set accessToken in cookies (expires in 7 days)
      Cookies.set("accessToken", res.data.accessToken, {
        expires: 7,
        path: "/",
      });

      toast.success("Login successful");

      router.push("/");
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <section className="bg-backgroundWhite flex h-screen w-full items-center justify-center p-4 sm:p-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-84 flex-col items-center justify-center"
      >
        <Image src={"/"} width={314} height={90} loading="eager" alt="logo" />

        <div className="w-full space-y-6">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder={t("email")}
              className="border-default w-full rounded-[16px] border p-4 text-base text-black outline-none"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {t(`${errors.email.message}`)}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder={t("password")}
              className="border-default w-full rounded-[16px] border p-4 text-base text-black outline-none"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {t(`${errors.password.message}`)}
              </p>
            )}
          </div>

          <p className="text-center text-xs text-black">
            {t("forgetPassword")}
            <Link
              href="/login/forget-password"
              className="text-default font-bold"
            >
              {t("resetRequest")}
            </Link>
          </p>
        </div>

        <CustomButton
          disabled={isLoading}
          type="submit"
          classes="w-full p-[14px] mt-8 flex items-center justify-center"
        >
          {isLoading ? <Spinner /> : t("login")}
        </CustomButton>
      </form>
    </section>
  );
};

export default Login;
