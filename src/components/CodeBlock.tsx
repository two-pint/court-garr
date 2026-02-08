import { codeToHtml } from "shiki"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export async function CodeBlock({
  code,
  language = "typescript",
  filename,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "material-theme-darker",
  })

  return (
    <div className="code-block rounded-sm">
      {filename && <div className="code-block-filename">{filename}</div>}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
