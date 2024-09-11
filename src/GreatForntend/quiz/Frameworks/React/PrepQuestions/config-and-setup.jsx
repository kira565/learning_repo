// * React env setup

// To run any React application we need to first step a ReactJS Developer Environment.
// There are 3 methods to setup the environment
// 1. Using create-react-app (CRA)
// 2. Using webpack and babel
// 3. Using Vite build tool

// Pre-requesite (предварительные условия)
// We must have:
// * NodeJS installed on PC (Windows/Linux/mac)

// * Method 1 Using create-react-app
// by command npx create-react-app <name>
// Default application will be created with the predefined project structure and scripts
// It will install some packages by default which can be seen in the dependencies
// Next we can start modify the application according our preferences

//* Method 2 Using webpack and babel
// To setup react development env using webpack and babel is a long process and we have to 
// import each package and create setup files ourselves

// We have to create the setup using npm init -y comand or yarn init then import the necessary packages
// in the folder and then install react using
//? npm i/yarn add react react-dom
// we also need some packages to make it work such as 
// webpack webpack-cli @babel/core @babel/preset-env@babel/preset-react  babel-loader 
// html-webpack-plugin webpack-dev-server --save-dev

//* Method 3 Using Vite build tool
// by executing command npm create vite@latest <Application_name>
// here we can select preset (react/react-ts) etc or TypeScript SWC - (new fast compiler for typescript/javascript written in Rust)
// now we see the basic project structure 

//* Why creating own config
// Custom environment setup allows us to choose tools to integrate in our project. It gives us many instruments to set up project
// with aligning to our needs from dev server and UI Framework to deployment process, i nthis scenario we are free to choose 
// tools to integrate in our project.

//* Configuring Webpack4
// The first stop will be configuring webpack. Its a powerfull tool for configuring web applciations. The core function of webpack
// is that it takes a bunch of Javascript files we write in our project and turns them into a single, minified file, so that it will be
// quick to serve. Starting from Webpack4 we arent required to write a config file at all.

//? npm install --save-dev webpack webpack-dev-server webpack-cli

// webpack - package - include core webpack functionality
// webpack-dev-server - this deelopment server automatically rerun webpack when our file us changed
// webpack-cli - enable running webpack from command line

//* Configuring Babel 7
// Webpack needs Babel to process ES6 into ES5 syntaxes in order to work with all available browsers.
//? npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader

// @babel/core is the main dependency that include babel transform script

//@babel/preset-env is the default Babel preset used to transform ES6+ into valid ES5 code. 
//Optionally configure browser polyfills automatically

// @babel/preset-react is used for transforming JSX and React class syntax into valid JavaScript code

//babel-loader is a webpack loader that hook Babel into webpack. We will run Babel from webpack with this package

//* Adding Prettier 
// To further speed up development, let's make our code formatter using Prettier.
//? npm install --save-dev --save-exact prettier
// make config in .prettierrc

//* Adding source map for better error logs
//Since webpack bundles the code, source maps are mandatory to get a reference to the original file that raised an error.
module.exports = {
  devtool: 'inline-source-map',
  // ... the rest of the config

};

//* Setting up ESLint
//Linter is a program that checks our code for any error or warning that can cause bugs. JavaScript's linter, ESLint, 
//is a very flexible linting program that can be configured in many ways.

//? npm --save-dev install eslint eslint-loader babel-eslint eslint-config-react eslint-plugin-react

//eslint is the core dependency for all functionalities, while eslint-loader enables us to hook eslint into webpack.

//Now since React used ES6+ syntax, we will add babel-eslint — a parser that enables eslint to lint all valid ES6+ codes.

//eslint-config-react and eslint-plugin-react are both used to enable ESLint to use pre-made rules.

//Since we already have webpack, we only have to modify the config slightly:
module.exports = {

  // modify the module
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'] // include eslint-loader
      }
    ]
  },
};

//* Adding CSS LESS processor
// In order to add LESS processor into our React application, we will require both less and loader packages from webpack

//? npm install --save-dev less less-loader css-loader style-loader

//less-loader will compile our less file into css

//whil css-loader will resolve css syntax like import or url(). 

//The style-loader will get our compiled css and load it up into <style> tag in our bundle. 
 const less = { 
        test: /\.less$/,
        use: [ 
          'style-loader',
          'css-loader', 
          'less-loader',
        ],
}

//* Deploying React app to Netlify
// All applications need to be deployed for its last step, and for React application, deployment is very easy.
// First, let's change the build output and development contentBase from dist to build in our Webpack config.
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'), // change this
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: "./build",
  },
}

// Now let's install a new Webpack plugin named HtmlWebpackPlugin
//? npm install html-webpack-plugin -D
//This plugin will generate index.html file in the same directory where our bundle.js is created by Webpack. 
//In this case, the build directory.

//Why do we need this plugin? Because Netlify requires a single directory to be made the root directory, so we can't use index.html 
//in our root directory using Netlify. You need to update your webpack config to look like this:

const plugins = {
   plugins: [
    new HtmlWebpackPlugin({
      template:  path.resolve('./index.html'),
    }),
  ]
}