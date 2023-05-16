# mentorship-page [![Netlify Status](https://api.netlify.com/api/v1/badges/f804919f-a599-456c-8127-496ed860123c/deploy-status)](https://app.netlify.com/sites/tender-meitner-99286b/deploys)

NextJS app for Advisory's Mentorship Network page.

## Getting Started

To get started, make sure NodeJS v16 is installed on your computer.
You can install it following the instructions on the [official NodeJS website](https://nodejs.org/en/).

Afterwards, clone the repository:

```bash
$ git clone https://github.com/AdvisorySG/mentorship-page.git
```

Then run the web application using these commands:

```bash
$ npm install # Update and install the required dependency packages
$ npm run dev
```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/AdvisorySG/CONTRIBUTING.md/blob/main/CONTRIBUTING.md)
for our contributing guidelines.

Make sure to commit on your local git instance and then push to Github.
[Prettier](https://prettier.io/) automatically runs everytime you commit (through a [Husky](https://typicode.github.io/husky/#/) hook).
It formats the code for readability purposes.

> If you are commiting directly on the Github Website, you can run Prettier manually to format the code before commiting

    ```
    $ npx prettier --write <filename> # Formats the code & Overwrites the file
    ```
    A Github workflow is configured to run `prettier` to check for proper code formatting for every pull request, so this formatting step must be done

## Project Architecture

```
[ Airtable Mentor Entries ]
            ▼
 [ AWS Lambda Function ]
            ▼
    [ Elasticsearch ]
            ▼
    [ NextJS Web App ]
```

[Airtable](https://www.airtable.com/) is a database we use to easily store our mentor data, such as
Mentor name, images, educational background, and more.

[AWS Lambda](https://aws.amazon.com/lambda/) is a compute service which allows us to run custom code on the
cloud without managing infrastructure. We can run our AWS Lambda script
periodically to read the Airtable mentor entries using the [Airtable API](https://github.com/Airtable/airtable.js), filter
them out, and update the Elasticsearch service with our Airtable Mentor Data.

[Elasticsearch](https://www.elastic.co/elasticsearch/) is an open source search and analytics engine. It allows
us to store, search and analyse huge volumes of mentor data quickly and
in near real-time and give back answers in milliseconds. We host our
Elasticsearch instance on [Elastic Cloud](https://www.elastic.co/cloud/).

Our [NextJS](https://nextjs.org/) Web App queries the Elasticsearch Service and displays the relevant mentors.
The web app is exported as static HTML, and then hosted on [Netlify](https://www.netlify.com/).
Netlify also has deploy previews which are created for each pull request, enabling us to easily test.
out code changes.

Some libraries we use on NextJS are [Material UI](https://mui.com/) (a components library)
and [react-search-ui](https://www.npmjs.com/package/@elastic/react-search-ui).

## Project Structure

### HTML/ CSS/ Typescript

1. `/components/` - Contains React Components used in the various pages
2. `/pages/` - Contains the Typescript code for the various pages of the app.
3. `/public` - Contains static files such as the `index.html` file, Javascript library files, images, and other assets.
4. `/styles` - Contains the CSS Stylesheets and CSS module files

### MainConfiguration Files

1. `/tsconfig.json` - Used to specify the root of a Typescript project
   1. Also specifies the compiler options required to compile the project
2. `/package.json` - A JSON file that lies at the root of an existing Javascript/Node project.
   1. It holds metadata relevant to the project and is used for managing an application’s dependencies.
   2. It also contains instructions that enable `npm` to start the project, run the script and install dependencies.
3. `/next.config.js` - Main NextJS Configuration Options
   1. Currently configured to allow imports of CSS files (guide used [here](https://cwtuan.blogspot.com/2022/10/disable-css-module-in-nextjs-v1231-sept.html))

### Backend & Workflow

1. `/scripts/` - Contains backend scripts used.
   1. `/scripts/load_mentors.js` is run on AWS Lambda. It connects to the Airtable Database, retrieves & filters the mentor data, and updates the Elasticsearch service.
2. `/.github/` - Contains files related to Github about the repo,
   1. `dependabot.yml` -> Configuration options for dependency updates. More info can be found at [Configuration Options for Dependency Updates](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates).
   2. `workflows/` -> Configuration files for Github workflows (automated processes). More info can be found at [About Workflows](https://docs.github.com/en/actions/using-workflows/about-workflows)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
