export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://yescab-dashboard-b63bs.ondigitalocean.app//sitemap.xml',
    }
}