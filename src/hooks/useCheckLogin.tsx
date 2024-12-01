import useSWR from "swr";
import { fetcher } from "@/services/axios";
import { API } from "@/services/api/api";
import { TUserData, useAuthContext } from "@/context/authContext";

export const useCheckLogin = () => {
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

	const { data, error, isValidating } = useSWR<TUserData>(
		token ? API.user : null, fetcher
	)

	if (!token) {
		return { statusError: 'no-token', user: null };
	}

	if (error) {
		return { statusError: 'error', user: null };
	}

	const user = data ? data.user : null;
	return { statusError: user ? 'success' : 'loading', user };
}
