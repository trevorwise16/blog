import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { birds } from '../src/db/schema'
import { sql } from 'drizzle-orm'

// Create a direct postgres connection for the script
const client = postgres(process.env.DATABASE_URL!)
const db = drizzle(client)

interface EBirdSpecies {
  sciName: string
  comName: string
  speciesCode: string
  category: string
  taxonOrder: number
  order?: string
  familyCode?: string
  familyComName?: string
  familySciName?: string
  extinct?: boolean
  extinctYear?: number
  reportAs?: string
}

async function populateBirds() {
  console.log('Fetching birds from eBird API...')

  try {
    // Fetch all birds from eBird API
    const response = await fetch(
      'https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json&locale=en'
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const ebirdData: EBirdSpecies[] = await response.json()

    console.log(`Found ${ebirdData.length} bird species`)

    // Filter to only include actual species (not hybrids, etc.)
    const speciesOnly = ebirdData.filter((bird) => bird.category === 'species')

    console.log(`Filtered to ${speciesOnly.length} species`)

    // Transform data for our database
    const birdsToInsert = speciesOnly.map((bird) => ({
      speciesCode: bird.speciesCode,
      sciName: bird.sciName,
      comName: bird.comName,
      category: bird.category,
      taxonOrder: bird.taxonOrder,
      order: bird.order || null,
      familyCode: bird.familyCode || null,
      familyComName: bird.familyComName || null,
      familySciName: bird.familySciName || null,
      extinct: bird.extinct || false,
      extinctYear: bird.extinctYear || null,
      reportAs: bird.reportAs || null,
      imageUrl: null, // Will be populated later
      description: null, // Will be populated later
    }))

    console.log('Inserting birds into database...')

    // Insert in batches to avoid overwhelming the database
    const batchSize = 100
    for (let i = 0; i < birdsToInsert.length; i += batchSize) {
      const batch = birdsToInsert.slice(i, i + batchSize)

      await db
        .insert(birds)
        .values(batch)
        .onConflictDoUpdate({
          target: birds.speciesCode,
          set: {
            sciName: sql`EXCLUDED.sci_name`,
            comName: sql`EXCLUDED.com_name`,
            category: sql`EXCLUDED.category`,
            taxonOrder: sql`EXCLUDED.taxon_order`,
            order: sql`EXCLUDED.order`,
            familyCode: sql`EXCLUDED.family_code`,
            familyComName: sql`EXCLUDED.family_com_name`,
            familySciName: sql`EXCLUDED.family_sci_name`,
            extinct: sql`EXCLUDED.extinct`,
            extinctYear: sql`EXCLUDED.extinct_year`,
            reportAs: sql`EXCLUDED.report_as`,
            updatedAt: sql`CURRENT_TIMESTAMP`,
          },
        })

      console.log(
        `Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(birdsToInsert.length / batchSize)}`
      )
    }

    console.log(
      `✅ Successfully populated ${birdsToInsert.length} bird species!`
    )
  } catch (error) {
    console.error('❌ Error populating birds:', error)
    process.exit(1)
  }
}

// Run the population script
await populateBirds()
console.log('Script completed successfully')
