"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signIn } from "../../../../server/users";

const LoginSchema = z.object({
	usernameOremail: z.string().min(1, "Please enter username or email"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginType = z.infer<typeof LoginSchema>;

const Page = () => {
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
		onSuccess: (message) => {
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
						className="w-full p-3 text-sm border outline-none  border-zinc-400 rounded-md"
					></input>
					{errors.usernameOremail && (
						<p className="text-sm text-red-500">
							{errors.usernameOremail.message}
						</p>
					)}
				</div>

				<div className="w-full">
					<input
						{...register("password")}
						autoComplete="off"
						placeholder="Enter password"
						className="w-full p-3 text-sm border outline-none  border-zinc-400 rounded-md"
					></input>
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
			<p className="text-sm ">
				Don't have an account?
				<Link
					className="ml-2 text-blue-700 hover:text-blue-500"
					href={"/accounts/signup"}
				>
					Sign up
				</Link>
			</p>
		</main>
	);
};

export default Page;
