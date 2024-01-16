import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Movies',
  description: 'A movie database',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#EEEEEE' }}>{children}</body>
    </html>
  )
}
