// Simple in-memory rate limiting (resets on deployment)
// For production, use Redis or a database
const submissions = new Map()

const isRateLimited = (ip) => {
    const now = Date.now()
    const COOLDOWN_MS = 120 * 1000 // 120 seconds
    const MAX_PER_24H = 2
    const WINDOW_24H = 24 * 60 * 60 * 1000

    if (!submissions.has(ip)) {
        submissions.set(ip, [])
    }

    const ipSubmissions = submissions.get(ip)

    // Clean up submissions older than 24 hours
    const recent = ipSubmissions.filter(timestamp => now - timestamp < WINDOW_24H)
    submissions.set(ip, recent)

    // Check 24 hour limit
    if (recent.length >= MAX_PER_24H) {
        return {
            limited: true,
            message: `You've reached the limit of ${MAX_PER_24H} messages per 24 hours. Please try again later.`
        }
    }

    // Check cooldown
    if (recent.length > 0) {
        const lastSubmission = recent[recent.length - 1]
        const elapsedMs = now - lastSubmission
        if (elapsedMs < COOLDOWN_MS) {
            const remainingSeconds = Math.ceil((COOLDOWN_MS - elapsedMs) / 1000)
            return {
                limited: true,
                message: `Please wait ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''} before sending another message.`
            }
        }
    }

    return { limited: false }
}

const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

export default async (req, res) => {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { name, email, message } = req.body

        // Validate input
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({ error: 'Name is required' })
        }

        if (!email || !validateEmail(email)) {
            return res.status(400).json({ error: 'Valid email is required' })
        }

        if (!message || typeof message !== 'string' || message.trim().length < 10) {
            return res.status(400).json({ error: 'Message must be at least 10 characters' })
        }

        // Get client IP for rate limiting
        const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || 'unknown'

        // Check rate limit
        const rateLimitCheck = isRateLimited(ip)
        if (rateLimitCheck.limited) {
            return res.status(429).json({ error: rateLimitCheck.message })
        }

        // Send to Formspree
        const formspreeResponse = await fetch('https://formspree.io/f/mnjwyljj', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name.trim(),
                email: email.trim(),
                message: message.trim(),
                _subject: `New message from ${name.trim()}`
            })
        })

        if (!formspreeResponse.ok) {
            throw new Error('Formspree request failed')
        }

        // Record submission for rate limiting
        const now = Date.now()
        if (!submissions.has(ip)) {
            submissions.set(ip, [])
        }
        submissions.get(ip).push(now)

        return res.status(200).json({ success: true, message: 'Message sent successfully' })
    } catch (error) {
        console.error('Contact form error:', error)
        return res.status(500).json({ error: 'An error occurred. Please try again later.' })
    }
}
