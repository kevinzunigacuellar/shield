export default function JobPost404() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <h2 className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Oops, the job you were looking for does not exist
        </h2>
        <p className="mt-4 text-muted-foreground">
          The page you requested could not be found. Please check the URL or try again later.
        </p>
      </div>
    </div>
  )
}