var fs = require('fs');
var resolve = require('app-root-path').resolve;
var objectAssign = require('object-assign');

function LoadAllRoutes(app, pth, opts) {
  if (typeof pth === 'string') {
    pth = {
      path: resolve(pth).replace(/\\/g, '/')
    };
  }

  opts = objectAssign({
    path: resolve('./routes').replace(/\\/g, '/'),
    common: '0_',
    middleware: function(req, res, next) {
      return next();
    }
  }, opts, pth);

  LoadRoutes(opts.path);

  function LoadRoutes(ff) {  
    var files = fs.readdirSync(ff);
    var dir_list = [];
    files.forEach(function(file, i) {
        if(opts.exclude && opts.exclude.test(file)) {
          return;
        }
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
          app.use(fkey, f[fkey], opts.middleware);
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