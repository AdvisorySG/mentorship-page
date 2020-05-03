# mentorship-page [![Netlify Status](https://api.netlify.com/api/v1/badges/f73b3513-e3ed-451b-b013-f70b023dce6a/deploy-status)](https://app.netlify.com/sites/wizardly-meninsky-4c65bd/deploys)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setting up Git LFS

If you wish to make changes to assets stored in this repository (such as those
in `data/profile_images/`, `public/assets` and `public/profile_images`), you
will need to set up [Git LFS](https://git-lfs.github.com/).

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

## Processing Mentors

You can use this nifty script here **in the root of the repository**, after
placing the relevant profile images in `data/profile_images` and ensuring
`data/mentors.csv` is updated. Please purge the destination directory
`public/profile_images` of all images before running this script.

```
$ rm -rf public/profile_images
$ python3 scripts/process_mentors.py data/csv data/profile_images public/profile_images > src/mentors.json
```
