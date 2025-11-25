"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
	CircleCheck,
	EyeIcon,
	EyeOffIcon,
	Loader2,
	XCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { checkUsername } from "@/actions/checkUsername";
import { useDebounce } from "@/hooks";
import { signUp } from "../../../../server/users";

const SignUpSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters"),
	username: z
		.string()
		.min(1, "Please enter username")
		.max(100, "Username must be less than 100 characters"),
	email: z.email().min(1, "Please enter email"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Must contain at least one uppercase letter")
		.regex(/[a-z]/, "Must contain at least one lowercase letter")
		.regex(/[0-9]/, "Must contain at least one number"),
});

type SignUpType = z.infer<typeof SignUpSchema>;

const Page = () => {
	const router = useRouter();

	const [view, setView] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		watch,
		setError,
		clearErrors,
		formState: { errors, isDirty },
	} = useForm<SignUpType>({ resolver: zodResolver(SignUpSchema) });

	const username = watch("username");

	const [isAvailable, setIsAvailable] = useState<null | "t" | "f">(null);

	const debouncedUsername = useDebounce(username, 1000);

	const { data } = useQuery({
		queryKey: ["check-username", debouncedUsername],
		queryFn: () => checkUsername(debouncedUsername),
		enabled: !!debouncedUsername,
	});

	const signUpMutation = useMutation({
		mutationFn: async (data: SignUpType) => {
			const { message } = await signUp({
				email: data.email,
				name: data.name,
				username: data.username,
				password: data.password,
			});
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

	useEffect(() => {
		if (!data) return;
		setIsAvailable(data.available ? "t" : "f");
		if (data.available) {
			clearErrors("username");
		} else {
			setError("username", {
				type: "manual",
				message: "This username isn't available. Please try another.",
			});
		}
	}, [data, setError, clearErrors]);

	const onSubmit: SubmitHandler<SignUpType> = (data) => {
		signUpMutation.mutate(data);
	};

	return (
		<main className="w-full h-full flex flex-col items-center justify-center">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="p-4  max-w-xl mx-auto w-full  rounded-xl flex flex-col items-center gap-4"
			>
				<div className="w-full">
					<input
						{...register("email")}
						autoComplete="off"
						placeholder="Enter email"
						className={`w-full ${errors.email ? "border-red-500" : "border-zinc-400"} p-3 text-sm border outline-none  rounded-md`}
					></input>
					{errors.email && (
						<p className="text-sm text-red-500">{errors.email.message}</p>
					)}
				</div>

				<div className="w-full">
					<div className="w-full relative">
						<input
							{...register("name")}
							autoComplete="off"
							placeholder="Enter name"
							className={`w-full ${errors.name ? "border-red-500" : "border-zinc-400"} p-3 text-sm border outline-none  rounded-md`}
						></input>
					</div>

					{errors.name && (
						<p className="text-sm text-red-500">{errors.name.message}</p>
					)}
				</div>

				<div className="w-full">
					<div className="w-full relative">
						<input
							{...register("username")}
							autoComplete="off"
							placeholder="Enter username"
							className={`w-full ${errors.username ? "border-red-500" : "border-zinc-400"} p-3 text-sm border outline-none  rounded-md`}
						></input>
						{!errors.username && (
							<div className="absolute top-1/2 right-2 -translate-y-1/2">
								{isAvailable === "t" && (
									<CircleCheck className="w-6 text-green-400" />
								)}
								{isAvailable === "f" && (
									<XCircleIcon className="w-6 text-red-500" />
								)}
							</div>
						)}
					</div>
					{errors.username && (
						<p className="text-sm text-red-500">{errors.username.message}</p>
					)}
				</div>

				<div className="w-full relative">
					<div className="w-full relative">
						<input
							type={view ? "text" : "password"}
							{...register("password")}
							autoComplete="off"
							placeholder="Enter password"
							className={`w-full ${errors.password ? "border-red-500" : "border-zinc-400"} p-3 text-sm border outline-none  rounded-md`}
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
					{signUpMutation.isPending ? (
						<Loader2 className="mx-auto w-4 animate-spin" />
					) : (
						<p>Sign Up</p>
					)}
				</button>
			</form>
			{username}
			{debouncedUsername}

			<p className="text-sm ">
				Already have an account?
				<Link
					className="ml-2 text-blue-700 hover:text-blue-500"
					href={"/accounts/login"}
				>
					Login
				</Link>
			</p>
		</main>
	);
};

export default Page;
