var fs = require('fs');
var resolve = require('app-root-path').resolve;
var objectAssign = require('object-assign');

function LoadAllRoutes(app, pth, opts) {
  if (typeof pth === 'string') {
    pth = {path: resolve(pth)};
  }

  opts = objectAssign({
    path: resolve('./routes'),
    common: '0_'
  }, opts, pth);

  LoadRoutes(opts.path);

  function LoadRoutes(ff) {  
    var files = fs.readdirSync(ff);
    var dir_list = [];
    files.forEach(function(file, i) {
        var fname = ff + '/' + file;
        var fkey = fname.replace(opts.path, '')
                        .replace(/\.js$/, '')
                        .replace(/index$/, '')
                        .replace(opts.common, '*')
                        .replace(/^\/\*$/, '*');
        var fval = fname.replace(/\.js$/, '');
        var stat = fs.lstatSync(fname);
        if(stat.isFile()) {
          var f = {};
          f[fkey] = require(fval);
          app.use(fkey, f[fkey]);
          console.log(fkey, fval);
        }
        if(stat.isDirectory()) {
          dir_list.push(fname);
        }
        if(i == files.length - 1) {
          dir_list.forEach(function(dir) {
            LoadRoutes(dir);
          });
        }
    });
  }
}

module.exports = LoadAllRoutes;