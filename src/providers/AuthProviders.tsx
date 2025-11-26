import {
	createContext,
	type PropsWithChildren,
	useContext,
	useState,
} from "react";
import type { User } from "@/types";

type AuthContext = {
	currentUser?: User | null;
	setCurrentUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	return (
		<AuthContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used inside of a AuthProvider");
	}
	return context;
}
