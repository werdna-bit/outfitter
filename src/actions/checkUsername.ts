export async function checkUsername(username: string) {
	const res = await fetch(`/api/check-username?username=${username}`, {
		method: "get",
		headers: {
			"content-type": "application/json",
		},
	});
	if (!res.ok) {
		const errordata = await res.json().catch(() => null);
		throw new Error(errordata?.message || `http error! status: ${res.status}`);
	}

	return await res.json();
}
