import type { FieldApi } from "@tanstack/react-form";

// biome-ignore lint: any
export function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
	return (
		<div className="min-h-6 -mt-1">
			{field.state.meta.isTouched && field.state.meta.errors.length ? (
				<span className="text-destructive text-sm">
					{field.state.meta.errors.join(",")}
				</span>
			) : null}
		</div>
	);
}
