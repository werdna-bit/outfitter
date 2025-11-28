import type { ReactNode } from "react";
import { useRef } from "react";

interface DialogProps {
	children: ReactNode;
	open: boolean;
	onClose: () => void;
	className?: string;
}

export const Dialog = ({ children, open, onClose, className }: DialogProps) => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	if (open && !dialogRef.current?.open) {
		dialogRef.current?.showModal();
	} else if (!open && dialogRef.current?.open) {
		dialogRef.current?.close();
	}

	const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		const rect = dialogRef.current?.getBoundingClientRect();
		if (
			rect &&
			(e.clientX < rect.left ||
				e.clientX > rect.right ||
				e.clientY < rect.top ||
				e.clientY > rect.bottom)
		) {
			onClose();
		}
	};

	return (
		<dialog
			ref={dialogRef}
			onClick={handleBackdropClick}
			onKeyDown={(e) => e.key === "Escape" && onClose()}
			className={`fixed top-1/2 left-1/2 -translate-x-1/2 rounded-md outline-0 ${className} -translate-y-1/2 w-11/12 max-w-lg`}
		>
			<div className="w-full p-4 max-w-lg">{children}</div>
		</dialog>
	);
};
