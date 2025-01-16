This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), using the Typescript Template.

It has been modified to include MDX and automatic parsing of content files to run a blog engine, unit testing via Jest, and end-to-end testing via Playwright.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Adding Blog Content

Modify or add markdown files in the `src/assets/articles` directory, and refresh to see the results in app! The file name and path relative to `articles/` will be the post slug in the `hostname/articles/slug` path. Supports nested subdirectories, for example for writing articles by year.

At the top of each file is a YAML based frontmatter section that requires these fields:

`title`: The article title that will display in the list of articles and at the top of the article page.

`date`: Publishing date of the article. Enclose in quotes to prevent automatic parsing into a date object.

`description`: Article description or summary that appears in the list of articles.

`thumbnailUrl`: Address relative to the `public/images/` directory of the thumbnail image.

`tags`: Array of strings for article tags, automatically counted and displayed on the hostname/tags page.

## Running Tests

Run Jest unit tests via the `npm run test` (for a single run) or `npm run test:watch` (for continuous file watch run) commands.

Playwright tests need the server running locally in either dev or production mode, then in a separate terminal window, run `npm run test:e2e` for headless mode with reporting in console, or `npm run test:e2e:ui` to run the Playwright ui.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Dependabot

This template repository is configured to use dependabot by default, to facilitate maintaining an up-to-date template for users. If you would like to disable this, be sure to remove the dependabot configuration file from `.github/dependabot.yml`.
