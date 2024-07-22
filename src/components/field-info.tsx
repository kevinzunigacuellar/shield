import type { FieldApi } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <span className="-mt-1 text-destructive text-sm">
          {field.state.meta.errors.join(",")}
        </span>
      ) : null}
    </>
  );
}
