
export const metadata = {
    title: 'Editorial Policy & Advertiser Disclosure | The Rich Grad Student',
    description: 'Our commitment to transparency, methodology for rating cards, and advertiser relationships.',
}

export const revalidate = 60;

export default function EditorialPolicyPage() {
    return (
        <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-4xl mx-auto prose prose-lg">
                <h1 className="text-4xl font-bold mb-8 font-heading">Editorial Policy & Advertiser Disclosure</h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 font-heading">1. Advertiser Disclosure</h2>
                    <p>
                        The Rich Grad Student is an independent publisher and comparison service, not a bank or financial institution.
                        We are able to maintain a free, high-quality resource for graduate students by accepting advertising compensation
                        from companies that appear on the site.
                    </p>
                    <p>
                        When you click on links to products (like credit cards) on our site and make a purchase or get approved,
                        we may earn a commission. This compensation may impact how and where products appear on this site (including,
                        for example, the order in which they appear).
                    </p>
                    <p className="font-semibold">
                        However, this compensation does NOT influence our editorial content, ratings, or recommendations.
                        We do not include all available financial offers.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 font-heading">2. Editorial Integrity & Methodology</h2>
                    <p>
                        Our goal is to help graduate students maximize their travel rewards and financial health.
                        Our reviews and "Best of" lists are based on quantitative analysis of:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Signup Bonuses:</strong> Adjusted for spending requirements.</li>
                        <li><strong>Earning Rates:</strong> Multipliers on key categories like dining and travel.</li>
                        <li><strong>Net Annual Cost:</strong> Annual fees minus reliable credits.</li>
                        <li><strong>Perk Value:</strong> Tangible benefits like lounge access or free nights.</li>
                    </ul>
                    <p>
                        Our "RGS Rating" (Great, Good, Poor) is determined by a proprietary formula weighing these factors against
                        the typical spending patterns of a graduate student. Banks cannot buy a better rating. A card is only
                        marked "Great" if the mathematical value consistently outweighs the cost.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 font-heading">3. Compliance with the CARD Act of 2009</h2>
                    <p>
                        We strictly adhere to regulations regarding the marketing of credit to students.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>No Inducements:</strong> We do not offer tangible items (t-shirts, pizza, etc.) to induce applications.</li>
                        <li><strong>Age Requirement:</strong> Our content is intended for graduate students who are typically over 21.
                            The richgradstudent.com does not knowingly market to undergraduate students under 21.</li>
                        <li><strong>Under-21 Notice:</strong> If you are under 21 years old, federal rules limit credit card approvals.
                            You may need to demonstrate independent income or apply with a co-signer to be approved.</li>
                        <li><strong>&quot;Student&quot; Card Reviews:</strong> Some cards we review are branded as &quot;Student&quot; cards (e.g., Discover It Student).
                            Our reviews of these products are intended for graduate students age 21+. These cards may have different
                            approval requirements for applicants under 21.</li>
                        <li><strong>Transparency:</strong> We strive to display terms, APRs, and fees clearly. However, terms change frequently.
                            Always verify the official terms on the issuer&apos;s secure application page before applying.</li>
                        <li><strong>APR Disclosures:</strong> When we mention introductory APR offers (e.g., &quot;0% APR for 15 months&quot;),
                            this applies to the specific offer type (purchases or balance transfers) as specified. After the intro period,
                            a variable APR will apply based on your creditworthiness. See issuer for current rates and fees.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 font-heading">4. Contact Us</h2>
                    <p>
                        If you have questions about our methodology or partnerships, please contact us at{' '}
                        <a href="mailto:contact@therichgradstudent.com" className="text-rgs-green hover:underline">
                            contact@therichgradstudent.com
                        </a>.
                    </p>
                </section>
            </div>
        </main>
    )
}
