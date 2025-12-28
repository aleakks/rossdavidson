import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

const PRIVACY_CONTENT = [
    {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Privacy Policy' }]
    },
    {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'This privacy policy sets out how Ross Davidson Photo uses and protects any information that you give when you use this website.' }]
    },
    {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '1. Information We Collect' }]
    },
    {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'We may collect the following information: Name, Contact information including email address, and other information relevant to customer surveys and/or offers.' }]
    },
    {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '2. How We Use Information' }]
    },
    {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'We require this information to understand your needs and provide you with a better service, and in particular for the following reasons: Internal record keeping, improving our products and services, and sending promotional emails.' }]
    },
    {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '3. Third Parties' }]
    },
    {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'We strictly do not sell, distribute, or lease your personal information to third parties. Any details provided are used solely for the purpose of the contact form and direct communication with you.' }]
    },
    {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: '4. Contact' }]
    },
    {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'If you have any questions about this policy, please contact us at studio@rossdavidson.com.' }]
    }
]

async function populatePrivacy() {
    try {
        console.log("Creating Privacy Policy...")

        const doc = {
            _type: 'legalPage',
            _id: 'privacy-policy',
            title: 'Privacy Policy',
            slug: { _type: 'slug', current: 'privacy-policy' },
            updatedAt: new Date().toISOString(),
            content: PRIVACY_CONTENT
        }

        const res = await client.createOrReplace(doc)
        console.log("Privacy Policy created:", res._id)

    } catch (e: any) {
        console.error("Failed to create privacy policy:", e.message)
    }
}

populatePrivacy()
