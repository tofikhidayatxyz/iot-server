const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .js('resources/js/schedule.js', 'public/js')
   .sass('resources/sass/style.scss', 'public/css').options({
   	processCssUrls: process.env.NODE_ENV == "development" ? false : true ,
    postCss: [
        require('autoprefixer')({
            cascade: false,
            flexbox: "no-2009"
        }),
    ]
});

mix.disableNotifications();