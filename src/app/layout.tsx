import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stethwork.org - Healthcare Professional Network',
  description: 'Connect, collaborate, and grow with healthcare professionals worldwide.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
