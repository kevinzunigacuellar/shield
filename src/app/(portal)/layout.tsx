import HeaderMenu from "@/components/portal-menu";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<HeaderMenu />
			<main className="flex-1">{children}</main>
		</>
	);
}
