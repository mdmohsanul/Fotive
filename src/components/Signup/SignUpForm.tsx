import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/utils/signup-form-schema";
import type { SignupData } from "@/utils/signup-form-schema";
import { useState } from "react";
import { useAppDispatch } from "@/app/store";
import { registerUser } from "@/features/auth/authThunks";

type SignUpProps = {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
};
export const SignUpForm: React.FC<SignUpProps> = ({ setShowPopup }) => {
  const dispatch = useAppDispatch();
  const [err, setErr] = useState<string | null>(null);

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignupData) {
    try {
      dispatch(registerUser(values)).then((result) => {
        if (result?.meta?.requestStatus === "rejected") {
          setErr("Failed to Log In. Please try again.");
        } else {
          setShowPopup(true);
        }
      });
    } catch (error) {
      console.log(error);
      //setErr(error || "Failed to Log In. Please try again.");
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username </FormLabel>
                <FormControl>
                  <Input placeholder="Alex" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            Sign Up
          </Button>
        </form>
      </Form>
      {err && <p>{err}</p>}
    </div>
  );
};

export default SignUpForm;
