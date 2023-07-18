menjalankan aplikasi

composer install
npm install
php artisan migrate --path=database/migrrations/tables
php artisan migrate --path=database/migrrations/views
php artisan db:seed
npm run bild