export async function sendEmail({
	email,
	username,
	id,
}: {
	email: string;
	username: string;
	id: string;
}) {
	const res = await fetch(
		`/api/send?email=${email}&username=${username}&id=${id}`,
		{
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
		},
	);
	if (!res.ok) {
		const errordata = await res.json().catch(() => null);
		throw new Error(errordata?.error || `http error! status: ${res.status}`);
	}

	return await res.json();
}
