import BirdGenerator from '@/components/bird-generator'

export default function BirdPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Random Bird Generator
        </h1>
        <p className="text-lg text-muted-foreground">Bird up!</p>
      </header>

      <BirdGenerator />
    </div>
  )
}
