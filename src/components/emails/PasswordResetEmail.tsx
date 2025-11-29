import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";

interface EmailProps {
	userEmail: string;
	resetUrl: string;
	expiryTime: string;
	userName: string;
}

const PasswordResetEmail = (props: EmailProps) => {
	const { userEmail, resetUrl, expiryTime, userName } = props;

	return (
		<Html lang="en" dir="ltr">
			<Head />
			<Preview>Reset your password - Action required</Preview>
			<Body
				style={{
					backgroundColor: "#f3f4f6",
					fontFamily: "Arial, sans-serif",
					padding: "40px 0",
				}}
			>
				<Container
					style={{
						backgroundColor: "#ffffff",
						borderRadius: "8px",
						maxWidth: "600px",
						margin: "0 auto",
						padding: "40px",
					}}
				>
					{/* Header */}
					<Section style={{ textAlign: "center", marginBottom: "32px" }}>
						<Heading
							style={{
								fontSize: "28px",
								fontWeight: "bold",
								color: "#111827",
								margin: "0 0 8px 0",
							}}
						>
							Password Reset Request
						</Heading>
						<Text style={{ fontSize: "16px", color: "#6b7280", margin: "0" }}>
							We received a request to reset your password
						</Text>
					</Section>

					{/* Main Content */}
					<Section style={{ marginBottom: "32px" }}>
						<Text
							style={{
								fontSize: "16px",
								color: "#1f2937",
								lineHeight: "24px",
								margin: "0 0 16px 0",
							}}
						>
							Hello {userName},
						</Text>
						<Text
							style={{
								fontSize: "16px",
								color: "#1f2937",
								lineHeight: "24px",
								margin: "0 0 16px 0",
							}}
						>
							We received a password reset request for your account associated
							with{" "}
							<Link href={`mailto:${userEmail}`} style={{ color: "#2563eb" }}>
								{userEmail}
							</Link>
							. If you made this request, click the button below to reset your
							password.
						</Text>
						<Text
							style={{
								fontSize: "16px",
								color: "#1f2937",
								lineHeight: "24px",
								margin: "0 0 24px 0",
							}}
						>
							This link will expire in <strong>{expiryTime} hours</strong> for
							security reasons.
						</Text>
					</Section>

					{/* Reset Button */}
					<Section style={{ textAlign: "center", marginBottom: "32px" }}>
						<Button
							href={resetUrl}
							style={{
								backgroundColor: "#2563eb",
								color: "#ffffff",
								padding: "16px 32px",
								borderRadius: "8px",
								fontSize: "16px",
								fontWeight: "600",
								textDecoration: "none",
								display: "inline-block",
							}}
						>
							Reset Password
						</Button>
					</Section>

					{/* Alternative Link */}
					<Section style={{ marginBottom: "32px" }}>
						<Text
							style={{
								fontSize: "14px",
								color: "#6b7280",
								lineHeight: "20px",
								margin: "0 0 8px 0",
							}}
						>
							If the button doesn't work, copy and paste this link into your
							browser:
						</Text>
						<Text
							style={{ fontSize: "14px", wordBreak: "break-all", margin: "0" }}
						>
							<Link
								href={resetUrl}
								style={{ color: "#2563eb", textDecoration: "underline" }}
							>
								{resetUrl}
							</Link>
						</Text>
					</Section>

					<Hr style={{ borderColor: "#e5e7eb", margin: "24px 0" }} />

					{/* Security Notice */}
					<Section style={{ marginBottom: "32px" }}>
						<Text
							style={{
								fontSize: "14px",
								color: "#1f2937",
								fontWeight: "600",
								margin: "0 0 8px 0",
							}}
						>
							Security Notice:
						</Text>
						<Text
							style={{
								fontSize: "14px",
								color: "#6b7280",
								lineHeight: "20px",
								margin: "0 0 8px 0",
							}}
						>
							• If you didn't request this password reset, please ignore this
							email
						</Text>
						<Text
							style={{
								fontSize: "14px",
								color: "#6b7280",
								lineHeight: "20px",
								margin: "0 0 8px 0",
							}}
						>
							• Never share your password or reset links with anyone
						</Text>
						<Text
							style={{
								fontSize: "14px",
								color: "#6b7280",
								lineHeight: "20px",
								margin: "0",
							}}
						>
							• This link can only be used once and will expire automatically
						</Text>
					</Section>

					{/* Footer */}
					<Hr style={{ borderColor: "#e5e7eb", margin: "24px 0" }} />
					<Section>
						<Text
							style={{
								fontSize: "12px",
								color: "#9ca3af",
								lineHeight: "16px",
								margin: "0 0 8px 0",
							}}
						>
							This email was sent to{" "}
							<Link href={`mailto:${userEmail}`} style={{ color: "#2563eb" }}>
								{userEmail}
							</Link>
							. If you have any questions, please contact our support team.
						</Text>
						<Text
							style={{
								fontSize: "12px",
								color: "#9ca3af",
								lineHeight: "16px",
								margin: "0 0 8px 0",
							}}
						>
							© 2025 Outfira. All rights reserved.
						</Text>
						<Text
							style={{
								fontSize: "12px",
								color: "#9ca3af",
								lineHeight: "16px",
								margin: "0",
							}}
						>
							6003 Diamant Street, Khomasdal, Windhoek, Namibia |{" "}
							<Link
								href="#"
								style={{ color: "#9ca3af", textDecoration: "underline" }}
							>
								Unsubscribe
							</Link>
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

PasswordResetEmail.PreviewProps = {
	userName: "werdna",
	userEmail: "tdevisuals@gmail.com",
	resetUrl: "https://outfira.werdnadev.com/reset-password?token=abc123xyz789",
	expiryTime: "24",
};

export default PasswordResetEmail;
