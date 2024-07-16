import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
	return (
		<header className="fixed w-full bg-gray-800 text-white p-4 z-10 flex justify-between items-center">
			<div className="flex space-x-4">
				<Link href="/">Home</Link>
				<Link href="/articles">Articles</Link>
				<Link href="/discover">Discover</Link>
				<Link href="/reports">Report</Link>
				<Link href="/admin">Admin</Link>
			</div>
			<div className="flex space-x-4">
				<input type="text" placeholder="Search..." className="p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none" />
				<Link href="/register">Register</Link>
				<Link href="/login">Login</Link>
				<Link href="/profile">
					<img src="/path-to-avatar.png" alt="Avatar" className="w-8 h-8 rounded-full" />
				</Link>
			</div>
		</header>
	);
};

export default Header;
