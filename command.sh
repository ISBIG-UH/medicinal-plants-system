docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  -d botaniq.cloud \
  -d www.botaniq.cloud \
  --email niccolo.devops.floratta@gmail.com \
  --agree-tos \
  --no-eff-email


docker compose --profile http up -d http-client
docker compose run --rm certbot-init certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  -d botaniq.cloud \
  -d www.botaniq.cloud \
  --email niccolo.devops.floratta@gmail.com \
  --agree-tos \
  --no-eff-email
docker compose stop http-client


docker compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    -d botaniq.cloud \
    -d www.botaniq.cloud \
    --email niccolo.devops.floratta@gmail.com \
    --agree-tos \
    --no-eff-email
