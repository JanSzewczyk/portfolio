import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-foreground mb-4 text-6xl font-bold">404</h1>
        <h2 className="text-foreground mb-4 text-3xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          The page you are looking for does not exist or has been moved. Please check the URL or navigate back to the
          home page.
        </p>
        <Link
          href="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
