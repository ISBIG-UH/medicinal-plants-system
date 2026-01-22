docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  -d botaniq.cloud \
  -d www.botaniq.cloud \
  --email niccolo.devops.floratta@gmail.com \
  --agree-tos \
  --no-eff-email