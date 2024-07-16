import "../styles/globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<AuthProvider>
					<div className="flex flex-col min-h-screen">
						<Header />
						<div className="flex flex-1 mt-16">
							<main className="flex-1 p-4">{children}</main>
						</div>
						<Footer />
					</div>
				</AuthProvider>
			</body>
		</html>
	);
}
