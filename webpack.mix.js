let mix = require('laravel-mix');
mix.js('resources/js/app.js', 'public/js')
  .sass('resources/sass/style.scss', 'public/css').options({
    postCss: [
        require('autoprefixer')({
            browsers: [
                'last 2 versions',
                'iOS >= 8',
                'Safari >= 8',
            ],
            cascade: false,
            flexbox: "no-2009"
        }),
    ]
});