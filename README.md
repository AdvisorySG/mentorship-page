# mentorship-page [![Netlify Status](https://api.netlify.com/api/v1/badges/f804919f-a599-456c-8127-496ed860123c/deploy-status)](https://app.netlify.com/sites/tender-meitner-99286b/deploys)

React app for Advisory's Mentorship Network page.

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

The AWS Lambda Function reads the Airtable mentor entries, filters them out, and updates the ElasticSearch service.
The React Web App queries the ElasticSearch Service and displays mentors. This allows for fast and easy searching of mentors.

## Project Structure

### `/public/`

The public folder in a react project contains static files
such as the `index.html` file, Javascript library files, images,
and other assets.

### `/src/`

Contains the Typescript code files and CSS Styles. The main app Logic is in `App.tsx`

### `/scripts/`

Contains backend scripts used.

1. `/scripts/load_mentors.js` is run on AWS Lambda. It connects to the AirTable Database, retrieves & filters the mentor data, and updates the ElasticSearch service.

### `/.github/`

Contains files related to Github about the repo,

1.  `dependabot.yml` -> Configuration options for dependency updates. More info [here](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/configuration-options-for-dependency-updates).
2.  `workflows/` -> Configuration files for Github workflows (automated processes). More info [here](https://docs.github.com/en/actions/using-workflows/about-workflows)

### `/tsconfig.json`

Used to specify the root of a Typescript project
Also specifies the compiler options required to compile the project

### `/package.json`

This file is a JSON file that lies at the root of an existing Javascript/Node project.
It holds metadata relevant to the project and is used for managing an application’s dependencies.
It also contains instructions that enable npm to start the project, run the script and install dependencies.

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
