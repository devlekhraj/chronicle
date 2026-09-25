/**
 * Renders a JSON-LD document. Server-rendered so crawlers see it in the
 * initial HTML (docs §44, §48).
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for the `</script>` terminator below.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
