

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl, 
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/utils/login-schema"
import type { LoginData } from "@/utils/login-schema"
import { useAppDispatch } from "@/app/store"
import { emailLogin } from "@/features/auth/authThunks"
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react"

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [err, setErr] = useState<string | null>(null);

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    "/dashboard";

  function onSubmit(values: LoginData) {
    try {
      dispatch(emailLogin(values)).then((result) => {
        if (result?.meta?.requestStatus === "rejected") {
          setErr("Failed to Log In. Please try again.");
        } else {
          navigate(from, { replace: true });
          // navigate("/dashboard");
        }
        console.log(result);
      });
    } catch (error) {
      console.log(error);
      //setErr(error || "Failed to Log In. Please try again.");
    }
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email </FormLabel>
                <FormControl>
                  <Input placeholder="alex@gmail.com" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-12 w-full rounded-full text-md cursor-pointer bg-gray-800 "
          >
            Sign in
          </Button>
        </form>
      </Form>
      {err && <p>{err}</p>}
    </div>
  );
}

export default LoginForm