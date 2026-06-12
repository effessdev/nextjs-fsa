<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Instructions

## General

- Only create custom components if a corresponding shadcn/ui component does not exist. You can add them using the command `pnpm dlx shadcn@latest add <component-name>`.
- Use semantic color tokens (defined in `@/app/globals.css`) instead of hardcoded Tailwind colors.
- Do not edit `@/db/schema/auth-schema.ts`. If you want to create a new schema, create a new file in `@/db/schema/` folder, or use an already existing file in `@/db/schema/` folder **which is not `auth-schema.ts`**. If you are creating a new schema file, remember to add the line `export * from "./<filename>"` in the `@/db/schema/index.ts` file.
- If you want an item (like a sign in form) in the middle of the screen, instead of `min-h-screen` in the parent container, use `min-h-dvh` as using `min-h-screen` will cause issues with mobile browsers.

## Style guide

- All headings have `font-bold`.

# Some examples

## Getting the session (server side)

```ts
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const session = await auth.api.getSession({ headers: await headers() })
```

## Getting the session (client side)

```tsx
import { authClient } from "@/lib/auth-client" // import the auth client
export function User(){
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()
    return (
        //...
    )
}
```

## Querying the database

This can be done using the Drizzle instance `db` from `@/db`. For example:

```ts
import db from "@/db"
const result = await db.select().from(myTable)
```

Schemas are located in `@/db/schema` folder, which contains multiple files.
