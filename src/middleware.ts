import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/jobs(.*)", "/applications(.*)"]);

export default clerkMiddleware((auth, req) => {
	if (isProtectedRoute(req)) {
		const { userId } = auth();
		if (!userId) {
			return auth().redirectToSignIn({
				returnBackUrl: req.url,
			});
		}

		auth().protect();
	}
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
