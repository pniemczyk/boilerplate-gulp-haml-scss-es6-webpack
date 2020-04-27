# Boilerplate for Gulp JS + HAML + SCSS
Minimal setup for building modular javascript apps with ES6, HAML and SCSS
- HAML compilation to HTML
- ES6 compilation to JS
- SCSS compilation to CSS
- Separate build directory for easy deployments
- Uglify to obscure and minify javascript 
- Gulp watch for incremental builds (compiling on save)
- Growl notifications
- Assets copy
- Partials
- Dev web server

## Getting started
Install node modules with `npm`
```sh
$ npm install
```
Compile and watch assets with `gulp`
```sh
$ gulp
```

## Partials
Simply put inside haml file line:
```
/partial:partials/_footer.html
/partial
```

where `partials/_footer.html` is relative path to the partial file.

> If build will fail just try to remove all files from build folder

Just place in haml 

### Based on project
[Jef Vlamings](https://github.com/jefvlamings/boilerplate-gulp-webpack-es6)
