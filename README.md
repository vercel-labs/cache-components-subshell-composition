# Public Pages Demo

Demonstrates how to build public pages in Next.js that combine prerendered content with dynamic, user-specific data.

- **Static components**: Prerendered at build time (e.g., header)
- **Cache components**: Use `"use cache"` to prerender components with external data (e.g., product list)
- **Streamed components**: Use Suspense to stream dynamic content without blocking prerendered parts (e.g., promotion banner)

## Run

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
