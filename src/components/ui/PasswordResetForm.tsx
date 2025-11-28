"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { checkUsernameOrEmail } from "@/actions/checkUsername";
import { Dialog } from "./Dialog";

const ResetSchema = z.object({
	usernameOremail: z.string().min(1, "Please enter username or email").max(100),
});

type ResetType = z.infer<typeof ResetSchema>;

export default function PasswordResetForm() {
	const {
		register,
		formState: { errors, isDirty },
		setError,
		handleSubmit,
	} = useForm<ResetType>({
		resolver: zodResolver(ResetSchema),
	});

	const [open, setOpen] = useState<boolean>(false);

	const checkMutation = useMutation({
		mutationFn: async (usernameOremail: string) =>
			checkUsernameOrEmail(usernameOremail),
		onSuccess: (data) => {
			if (data.available) {
				setError("usernameOremail", {
					type: "manual",
					message: "User not found",
				});
			} else {
				setOpen(true);
			}
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});

	const onSubmit: SubmitHandler<ResetType> = (data) => {
		checkMutation.mutate(data.usernameOremail);
	};

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-xl flex flex-col gap-4 p-4 border"
			>
				<div className="w-full">
					<div className="w-full relative">
						<input
							{...register("usernameOremail")}
							autoComplete="off"
							placeholder="Enter username"
							className={`w-full ${errors.usernameOremail ? "border-red-500" : "border-zinc-400"} p-3 text-sm border outline-none  rounded-md`}
						></input>
					</div>
					{errors.usernameOremail && (
						<p className="text-sm text-red-500">
							{errors.usernameOremail.message}
						</p>
					)}
				</div>
				<button
					type="submit"
					disabled={!isDirty}
					className="w-full h-12 border"
				>
					{checkMutation.isPending ? (
						<Loader2 className="animate-spin mx-auto w-5" />
					) : (
						<p>Reset Password</p>
					)}
				</button>
			</form>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<p>Test</p>
			</Dialog>
		</div>
	);
}
