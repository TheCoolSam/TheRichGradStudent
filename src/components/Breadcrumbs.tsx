import Link from 'next/link'

export interface BreadcrumbItem {
    label: string
    href?: string // undefined = current page (no link)
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    // Generate JSON-LD structured data for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: item.href ? `${process.env.NEXT_PUBLIC_SITE_URL || ''}${item.href}` : undefined,
        })),
    }

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center">
                            {index > 0 && (
                                <svg
                                    className="w-4 h-4 mx-2 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            )}
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="text-rgs-green hover:text-rgs-green/80 hover:underline transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-gray-800 font-medium">{item.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    )
}
