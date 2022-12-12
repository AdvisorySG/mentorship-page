# mentorship-page [![Netlify Status](https://api.netlify.com/api/v1/badges/f804919f-a599-456c-8127-496ed860123c/deploy-status)](https://app.netlify.com/sites/tender-meitner-99286b/deploys)

React app for Advisory's Mentorship Network page.

## Getting Started

To get started, make sure NodeJS v18 is installed on your computer.
You can install it following the instructions on the [Official NodeJS Website](https://nodejs.org/en/)

Afterwards, you can download this repo onto our computer, or clone
this repo using the command

```bash
$ git clone https://github.com/AdvisorySG/mentorship-page.git`
```

We can run the web application using these commands

```bash
$ npm install # Update and Install the required dependency packages
$ npm start
```

## Contributing

This project uses the [GitHub flow](https://guides.github.com/introduction/flow/).
Contributors should create a new branch for every Pull Request to be submitted.
Before submitting the Pull Request, make sure to run `prettier` to format the code for readability purposes.
A Github workflow is configured to run `prettier` to check for proper code formatting for every pull request.

```
$ npx prettier --write . # Automatically formats the code to look nice
```

For more information on contributing guidelines, please read this [CONTRIBUTING.md](https://github.com/AdvisorySG/dawn-advisory-theme/blob/main/CONTRIBUTING.md)

## Project Architecture

```
[ Airtable Mentor Entries ]
            ▼
 [ AWS Lambda Function ]
            ▼
    [ ElasticSearch ]
            ▼
    [ React Web App ]
```

[Airtable](https://www.airtable.com/) is a database we use to easily store our mentor data, such as
Mentor name, images, educational background, and more.

[AWS Lambda](https://aws.amazon.com/lambda/) is a compute service which allows us to run custom code on the
cloud without managing infrastructure. We can run our AWS Lambda script
periodically to read the Airtable mentor entries using the [Airtable API](https://github.com/Airtable/airtable.js), filter
them out, and update the ElasticSearch service with our Airtable Mentor Data.

[Elasticsearch](https://www.elastic.co/elasticsearch/) is an open source search and analytics engine. It allows
us to store, search and analyse huge volumes of mentor data quickly and
in near real-time and give back answers in milliseconds. We hosted an
ElasticSearch instance on [Elastic Cloud](https://www.elastic.co/cloud/).

Our [React](https://reactjs.org/) Web App queries the ElasticSearch Service and displays the relevant mentors.
The web app is hosted on [Netlify](https://www.netlify.com/). Netlify also has deploy previews
which are created for each pull request, which allows us to easily test
our code changes.

## Project Structure

### `/public/`

The public folder in a react project contains static files
such as the `index.html` file, Javascript library files, images,
and other assets.

### `/src/`

Contains the Typescript code files and CSS Styles. The main app Logic is in `App.tsx`

### `/scripts/`

Contains backend scripts used.

1. `/scripts/load_mentors.js` is run on AWS Lambda. It connects to the Airtable Database, retrieves & filters the mentor data, and updates the ElasticSearch service.

### `/.github/`

Contains files related to Github about the repo,

1.  `dependabot.yml` -> Configuration options for dependency updates. More info can be found at [Configuration Options for Dependency Updates](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates).
2.  `workflows/` -> Configuration files for Github workflows (automated processes). More info can be found at [About Workflows](https://docs.github.com/en/actions/using-workflows/about-workflows)

### `/tsconfig.json`

Used to specify the root of a Typescript project
Also specifies the compiler options required to compile the project

### `/package.json`

This file is a JSON file that lies at the root of an existing Javascript/Node project.
It holds metadata relevant to the project and is used for managing an application’s dependencies.
It also contains instructions that enable `npm` to start the project, run the script and install dependencies.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
