'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { getRandomBirdFromDB } from '@/lib/actions'
import { RefreshCw } from 'lucide-react'

interface BirdData {
  name: string
  sciName: string
  imageUrl?: string
}

async function fetchBirdImage(sciName: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(sciName)}&rank=species&per_page=1`
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

export default function BirdGenerator() {
  const [bird, setBird] = useState<BirdData | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(false)

  const loadBirdData = async () => {
    try {
      setLoading(true)
      const birdData = await getRandomBirdFromDB()
      setBird({ ...birdData, imageUrl: undefined })

      setImageLoading(true)
      const imageUrl = await fetchBirdImage(birdData.sciName)
      setBird((prev) =>
        prev ? { ...prev, imageUrl: imageUrl || undefined } : null
      )
    } catch (error) {
      console.error('Error loading bird data:', error)
    } finally {
      setLoading(false)
      setImageLoading(false)
    }
  }

  useEffect(() => {
    loadBirdData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <main>
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-foreground">
          {bird?.name || 'Loading...'}
        </h2>

        <article>
          {bird?.imageUrl && (
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

          {bird && !bird.imageUrl && !imageLoading && (
            <div className="mb-4 p-8 bg-muted rounded-lg text-center">
              <p className="text-muted-foreground">
                No image available for this bird
              </p>
            </div>
          )}

          {imageLoading && (
            <div className="mb-4 p-8 bg-muted rounded-lg text-center">
              <p className="text-muted-foreground">Loading image...</p>
            </div>
          )}
        </article>

        <div className="flex justify-center">
          <Button
            onClick={loadBirdData}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Loading...' : 'New Bird'}
          </Button>
        </div>
      </div>
    </main>
  )
}
