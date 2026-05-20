import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <h1 className="mb-4 font-bold text-6xl text-foreground">404</h1>
        <h2 className="mb-4 font-bold text-3xl text-foreground">Page Not Found</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          The page you are looking for does not exist or has been moved. Please check the URL or navigate back to the
          home page.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
