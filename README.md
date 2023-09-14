This repo contains two pieces of the Tech Transfer site's abstract search:

1. The app folder contains a wrapper application that embed's the OTT search widget on the page.
2. The rss folder contains a maintenance script that will create RSS files for the TTC site

Original readme.md below:

## App

TBD

## RSS

To work on the RSS script:

```
cd rss
nvm use
npm install
node src/main.js
```

To run the script in Docker:

```
cd rss
docker build -t ttc-rss .
docker run -it --rm --env-file .env-develop ttc-rss /rss/run.sh
```

The `docker run` line can be added to a CRON job to run this regularly. It will create a temporary image, execute the script, and then remove the image upon completion.

Remember, you will need an appropriate `.env` file with the following content:

```
DOMAIN=techtransfer.cancer.gov
AKAMAI_HOSTNAME=hostname.akamaihd.net
AKAMAI_KEYNAME=keyname
AKAMAI_KEY=key
AKAMAI_CPCODE=1234567
```
