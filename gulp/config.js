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
    'node_modules/angular-route/angular-route.min.js.map'
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
  clientImgs: 'client/imgs/*'
};
