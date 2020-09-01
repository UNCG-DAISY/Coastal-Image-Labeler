function generateUnAuthObj({ message }: { message: string }) {
  return {
    success: false,
    message: message,
  }
}

export { generateUnAuthObj }
