rm bitbucket-enforcements.zip
rm -rf bitbucket-enforcements
mkdir bitbucket-enforcements
cp manifest.json bitbucket-enforcements/manifest.json
cp bitbucket-enforcements.js bitbucket-enforcements/bitbucket-enforcements.js
cp icon.png bitbucket-enforcements/icon.png

zip -r bitbucket-enforcements.zip bitbucket-enforcements
