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
import { Loader2 } from "lucide-react";

type SignUpProps = {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SignUpForm: React.FC<SignUpProps> = ({ setShowPopup }) => {
  const dispatch = useAppDispatch();
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignupData) {
    setLoading(true);
    try {
      const result = await dispatch(registerUser(values));

      if (result?.meta?.requestStatus === "rejected") {
        setErr("Failed to Sign Up. Please try again.");
      } else {
        setShowPopup(true);
      }
    } catch (error) {
      console.error(error);
      setErr("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
            disabled={loading}
            className="h-12 w-full rounded-full text-md cursor-pointer bg-gray-800 text-white hover:bg-gray-900 transition-colors duration-300"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>
      {err && <p className="text-red-500 text-sm mt-2">{err}</p>}
    </div>
  );
};

export default SignUpForm;
