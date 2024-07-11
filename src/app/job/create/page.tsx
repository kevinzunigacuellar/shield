import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JobCreateForm from "./job-form";

export default function JobCreationPage() {
  return (
    <main className="py-16">
      <Card className="w-full max-w-3xl mx-auto p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create a Job</CardTitle>
          <CardDescription>
            Fill out the form below to create a new job posting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JobCreateForm />
        </CardContent>
      </Card>
    </main>
  );
}
