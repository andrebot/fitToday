'use strict';

const requireDir = require('require-dir');

// =======================
// = Importing all tasks =
// =======================
requireDir('./gulp/tasks', { recurse: true });
