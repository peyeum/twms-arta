export default async (url, options) => {
  try {
    const response = await fetch(url, options)
    if (!response?.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    if (data?.error) {
      throw new Error(data.error)
    }
    return data
  } catch (error) {
    return { error }
  }
}
