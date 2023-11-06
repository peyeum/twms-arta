import { headers } from "next/headers"

export default (url) => {
  const headersList = headers()
  const header_url = headersList.get('x-url') ?? ""
  const reqUrl = new URL(header_url)
  return `${reqUrl.origin}${url}`
}