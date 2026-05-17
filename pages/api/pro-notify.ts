import type { NextApiRequest, NextApiResponse } from 'next'

interface ProNotifyResponse {
  ok?: boolean
  error?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProNotifyResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  const source = typeof req.body?.source === 'string' ? req.body.source.trim().slice(0, 80) : 'unknown'

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  const formspreeEndpoint =
    process.env.FORMSPREE_PRO_NOTIFY_ENDPOINT ||
    process.env.NEXT_PUBLIC_FORMSPREE_SURVEY_URL ||
    'https://formspree.io/f/xvgjjanv'

  if (!formspreeEndpoint) {
    return res.status(503).json({ error: 'Email capture is not configured' })
  }

  try {
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        source,
        product: 'tickk',
        form_name: 'Tickk Pro early access',
        submitted_at: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      const message = await response.text()
      console.error('Formspree Pro waitlist submit failed:', message)
      return res.status(500).json({ error: 'Failed to save email' })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Pro notify error:', error)
    return res.status(500).json({ error: 'Failed to save email' })
  }
}
