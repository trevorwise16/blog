export default function About() {
        return (
                <div className="max-w-4xl mx-auto px-6 py-12">
                        <header className="mb-8">
                                <h1 className="text-4xl font-bold text-foreground mb-4">
                                        About
                                </h1>
                                <p className="text-lg text-muted-foreground">
                                        Everyone else seems to have one of these pages
                                </p>
                        </header>

                        <main className="prose prose-lg max-w-none">
                                <div className="space-y-6">
                                        <p className="text-foreground mb-4 text-lg leading-relaxed">
                                                This is a website I made to demonstrate I&apos;m a competent engineer. I write blog posts about things that are and are not computer science-related.
                                        </p>

                                        <p className="text-foreground mb-4 text-lg leading-relaxed">
                                                I&apos;m an engineer based in San Francisco with a focus on data engineering. I&apos;ve spent most of my career thinking about data pipelines, cloud infrastructure, and internet scanning. Now, I&apos;m looking to become an AI sellout and code myself out of a job.
                                        </p>

                                        <p className="text-foreground mb-4 text-lg leading-relaxed">
                                                In my free time I enjoy camping, skiing, and fantasy novels. Did I mention I&apos;m extremely empathetic and cool too? Any one of my friend can attest to this.
                                        </p>

                                        <p className="text-foreground text-lg leading-relaxed">
                                                This blog is built with Next.js, Tailwind CSS, shadcn/ui components, and PostgreSQL for data storage.
                                        </p>
                                </div>
                        </main>
                </div>
        );
}
