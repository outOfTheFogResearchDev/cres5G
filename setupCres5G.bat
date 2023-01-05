git clone https://github.com/outOfTheFogResearchDev/cres5G &
cd cres5G &
mkdir config &
echo exports.SECRET = `${Math.random()}`; > config/config.js &
npm run setup &
echo ^@echo off >> ../cres5G.bat &
echo cd cres5G ^& >> ../cres5G.bat &
echo startCres5G.bat >> ../cres5G.bat