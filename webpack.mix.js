const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
  .sass('resources/sass/style.scss', 'public/css').options({
    postCss: [
        require('autoprefixer')({
            cascade: false,
            flexbox: "no-2009"
        }),
    ]
});

mix.disableNotifications();