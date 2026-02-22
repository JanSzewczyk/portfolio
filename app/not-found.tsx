import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@szum-tech/design-system";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <h1 className="text-display-lg text-foreground mb-4 font-bold">404</h1>
        <h2 className="text-heading-h1 text-foreground mb-4">Page Not Found</h2>
        <p className="text-body-lg text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved. Please check the URL or navigate back to the
          home page.
        </p>
        <Button asChild size="lg" startIcon={<ArrowLeftIcon />}>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
