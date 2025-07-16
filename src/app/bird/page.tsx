import { db } from '@/db'
import { birds } from '@/db/schema'
import { eq } from 'drizzle-orm'
import Image from 'next/image'

interface BirdData {
  name: string
  description?: string
  imageUrl?: string
}

async function getRandomBirdData() {
  const bird = await fetchRandomBird()
  const imageUrl = await fetchBirdImage(bird.sciName)

  const data: BirdData = {
    name: bird.comName,
    imageUrl: imageUrl || undefined,
  }
  return data
}

async function fetchRandomBird() {
  const seed = Math.floor(Math.random() * 11000)
  const [bird] = await db.select().from(birds).where(eq(birds.id, seed))
  return bird
}

async function fetchBirdImage(name: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(name)}&rank=species&per_page=1`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (
      data.results &&
      data.results.length > 0 &&
      data.results[0].default_photo
    ) {
      return data.results[0].default_photo.medium_url
    }

    return null
  } catch (error) {
    console.error('Error fetching bird image:', error)
    return null
  }
}

export default async function BirdPage() {
  const bird = await getRandomBirdData()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Random Bird Generator
        </h1>
        <p className="text-lg text-muted-foreground">Bird up!</p>
      </header>

      <main>
        <div className="space-y-8">
          <article>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              {bird.name}
            </h2>

            {bird.imageUrl && (
              <div className="mb-4">
                <Image
                  src={bird.imageUrl}
                  alt={bird.name}
                  width={400}
                  height={300}
                  className="w-full max-w-md h-auto rounded-lg shadow-md"
                />
              </div>
            )}

            {!bird.imageUrl && (
              <div className="mb-4 p-8 bg-muted rounded-lg text-center">
                <p className="text-muted-foreground">
                  No image available for this bird
                </p>
              </div>
            )}
          </article>
        </div>
      </main>
    </div>
  )
}
