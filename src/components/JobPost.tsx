"use client";
// @ts-ignore
import DOMPurify from "dompurify";

export default function JobClientPost({html}: {html: string}) {
  
  return (
    <article
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
      className="prose"
    />
  );
}
