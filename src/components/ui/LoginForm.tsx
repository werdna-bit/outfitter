"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signIn } from "../../../server/users";

const LoginSchema = z.object({
	usernameOremail: z.string().min(1, "Please enter username or email"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginType = z.infer<typeof LoginSchema>;

const Page = () => {
	const [view, setView] = useState<boolean>(false);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm<LoginType>({ resolver: zodResolver(LoginSchema) });

	const loginMutation = useMutation({
		mutationFn: async (data: LoginType) => {
			const { message } = await signIn(data.usernameOremail, data.password);
			return message;
		},
		onSuccess: async (message) => {
			toast.success(message);

			router.push("/dashboard");
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});

	const onSubmit: SubmitHandler<LoginType> = (data) => {
		loginMutation.mutate(data);
	};
	return (
		<main className="w-full h-full flex flex-col items-center justify-center">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="p-4  max-w-xl mx-auto w-full  rounded-xl flex flex-col items-center gap-4"
			>
				<div className="w-full">
					<input
						{...register("usernameOremail")}
						autoComplete="off"
						placeholder="Enter username or email"
						className={`w-full p-3 ${errors.usernameOremail ? "border-red-500" : "border-zinc-400"} text-sm border outline-none  rounded-md`}
					></input>
					{errors.usernameOremail && (
						<p className="text-sm text-red-500">
							{errors.usernameOremail.message}
						</p>
					)}
				</div>

				<div className="w-full">
					<div className="w-full relative">
						<input
							{...register("password")}
							type={view ? "text" : "password"}
							autoComplete="off"
							placeholder="Enter password"
							className={`w-full p-3 ${errors.password ? "border-red-500" : "border-zinc-400"} text-sm border outline-none   rounded-md`}
						></input>

						<button
							onClick={() => setView((prev) => !prev)}
							type="button"
							className="cursor-pointer  hover:scale-90 transition-all absolute duration-200 ease-in-out top-1/2 -translate-y-1/2 right-2"
						>
							{view ? <EyeIcon width={18} /> : <EyeOffIcon width={18} />}
						</button>
					</div>
					{errors.password && (
						<p className="text-sm text-red-500">{errors.password.message}</p>
					)}
				</div>
				<button
					disabled={!isDirty}
					type="submit"
					className="w-full p-3 text-sm border-black rounded-md transition-all duration-400 ease-in-out  cursor-pointer bg-black border text-white hover:text-black hover:bg-transparent  hover:border-black"
				>
					{loginMutation.isPending ? (
						<Loader2 className="mx-auto w-4 animate-spin" />
					) : (
						<p>Login</p>
					)}
				</button>
			</form>
			<div className="flex flex-col items-center gap-8">
				<p className="text-sm ">
					Don't have an account?
					<Link
						className="ml-2 text-blue-700 hover:text-blue-500"
						href={"/accounts/signup"}
					>
						Sign up
					</Link>
				</p>
				<Link
					className="text-sm hover:underline"
					href={"/accounts/password/reset"}
				>
					Forgot password?
				</Link>
			</div>
		</main>
	);
};

export default Page;
