export const parseContent = (content: string): string => {
  let parsedContent = content.replace(
    /\$\$(.*?)\$\$/gs,
    '<math display="block">$1</math>',
  )

  parsedContent = parsedContent.replace(
    /\$(.*?)\$/g,
    '<math display="inline">$1</math>',
  )

  return parsedContent
}
