# multi_config_app

This app was build with a specific use-case in mind, to gather a list of sites and then iterate through them for specific configurations. These will then be rendered into a table for review. 

It's structured into two fundamental sections: 

*Server - This handles all the data through it's API endpoints and caching. The front-end directly calls out to this site but doesn't do anything else. 

*SRC - This is the app itself and handles all the front-end components. It has basic state management through Reacts useContext API. 

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode and will spin up both the server, it's end-points and the react app. The app will run on: http://localhost:3000 but will also proxy to a server on localhost:3001. 

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

