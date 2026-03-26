/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import CustomButton from "@/components/shared/CustomButton";
import { Spinner } from "@/components/ui/spinner";
import {
  useForgotPasswordMutation,
  useNewPasswordMutation,
  useOtpVerificationMutation,
} from "@/store/features/auth/authApi";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import logo from "@/assets/logo/largeLogo.png";
import { ForgotFormData, forgotSchema } from "@/validation/ForgotPassZod";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
const Login = () => {
  // lang
  const t = useTranslations();
  const router = useRouter();
  const [tempUser, setTempUser] = useState<{ email: string; otp: string }>({
    email: "",
    otp: "",
  });
  const [resetDetails, setResetDetails] = useState<{
    resetToken: string;
    newPassword: string;
  }>({ resetToken: "", newPassword: "" });
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [otpVerification, { isLoading: OtpLoading }] =
    useOtpVerificationMutation();
  const [newPassword, { isLoading: newPassLoading }] = useNewPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormData) => {
    try {
      const res = await forgotPassword(data).unwrap();
      toast.success(res.message);
      setTempUser((prev) => ({ ...prev, email: data.email }));
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed");
    }
  };
  const handleVerifyOtp = async () => {
    if (tempUser.otp.length !== 4) return toast.warning("Enter OTP");
    try {
      const res = await otpVerification(tempUser);
      if (res.error) {
        const errorMessage =
          "data" in res.error
            ? (res.error.data as any)?.message
            : (res.error ?? "OTP verification failed");
        toast.error(errorMessage);
      }
      if (res?.data?.success) {
        toast.success(res?.data.message);
        setResetDetails((prev) => ({
          ...prev,
          resetToken: res?.data?.data?.resetToken,
        }));
      }
    } catch (error: any) {
      console.log(error);
      // toast.error(error.data?.message || "Failed to verify");
    }
  };
  const handleNewPassword = async () => {
    if (!resetDetails.newPassword.trim())
      return toast.warning("New password is required");
    try {
      const { data } = await newPassword(resetDetails);
      toast.success(data?.message);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to set");
    }
  };
  return (
    <section className="bg-backgroundWhite flex h-screen w-full items-center justify-center p-4 sm:p-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-84 flex-col items-center justify-center"
      >
        <Image src={logo} width={314} height={90} loading="eager" alt="logo" />

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
          {/* otp */}
          {tempUser.email ? (
            <>
              {resetDetails.resetToken ? (
                <div>
                  <input
                    type="password"
                    placeholder={t("newPassword")}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setResetDetails((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className="border-default w-full rounded-[16px] border p-4 text-base text-black outline-none"
                  />
                  <CustomButton
                    handleClick={handleNewPassword}
                    disabled={newPassLoading}
                    type="button"
                    classes="w-full p-[14px] mt-8 flex items-center justify-center"
                  >
                    {newPassLoading ? <Spinner /> : t("setNewPassword")}
                  </CustomButton>
                </div>
              ) : (
                <div dir="ltr" className="flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-foreground text-base font-medium">
                      {t("enterOTP")}
                    </p>
                    <InputOTP
                      maxLength={4}
                      onChange={(value) => {
                        setTempUser((prev) => ({ ...prev, otp: value }));
                      }}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <div>
                    <CustomButton
                      handleClick={handleVerifyOtp}
                      disabled={OtpLoading}
                      type="button"
                      classes="w-full p-[14px] mt-8 flex items-center justify-center"
                    >
                      {OtpLoading ? <Spinner /> : t("verifyOTP")}
                    </CustomButton>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div>
              <p className="mt-5 text-center text-xs text-black">
                <Link href="/login" className="text-default font-bold">
                  {t("backToLogin")}
                </Link>
              </p>
              <CustomButton
                disabled={isLoading}
                type="submit"
                classes="w-full p-[14px] mt-8 flex items-center justify-center"
              >
                {isLoading ? <Spinner /> : t("resetPassword")}
              </CustomButton>
            </div>
          )}
        </div>
      </form>
    </section>
  );
};

export default Login;
