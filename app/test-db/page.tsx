import { neon } from "@neondatabase/serverless"

export default async function TestDb() {
  let dbIsWorking = false

  try {
    const sql = neon(`${process.env.DATABASE_URL}`)
    await sql`SELECT 1`
    dbIsWorking = true
  } catch (e) {
    console.log(e)
  }

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center p-4">
      <p className="max-w-sm text-center text-sm text-muted-foreground">
        Using @neondatabase/serverless, we tried to run SELECT 1 on the
        database.
        {dbIsWorking
          ? " It didn't throw an error, so the database is probably working properly."
          : " It threw an error, so the database is probably not working properly."}
      </p>
    </div>
  )
}
