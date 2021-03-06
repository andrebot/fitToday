module.exports = {
  serverTestFiles: 'tests/server/**/*.spec.js',
  clientJSLib: [
    'node_modules/angular/angular.min.js',
    'node_modules/angular/angular.min.js.map',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-animate/angular-animate.min.js.map',
    'node_modules/angular-aria/angular-aria.min.js',
    'node_modules/angular-aria/angular-aria.min.js.map',
    'node_modules/angular-material/angular-material.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-route/angular-route.min.js.map',
    'node_modules/angular-resource/angular-resource.min.js',
    'node_modules/angular-resource/angular-resource.min.js.map',
    'node_modules/angular-local-storage/dist/angular-local-storage.min.js',
    'node_modules/angular-local-storage/dist/angular-local-storage.min.js.map',
    'node_modules/angular-cookies/angular-cookies.min.js',
    'node_modules/angular-cookies/angular-cookies.min.js.map'
  ],
  clientCSSLib: [
    'node_modules/angular-material/angular-material.min.css'
  ],
  serverIndex: 'server/index.js',
  distFolder: 'server/public',
  viewFolder: 'server/public/views',
  clientHTML: 'client/**/*.html',
  clientIndex: 'client/index.html',
  clientInits: 'client/**/*.init.js',
  clientJS: 'client/**/*.js',
  clientCSS: 'client/**/*.css',
  clientImgs: 'client/imgs/*'
};
