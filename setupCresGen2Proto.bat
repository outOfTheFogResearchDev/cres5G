git clone https://github.com/outOfTheFogResearchDev/cresGen2Proto &
cd cresGen2Proto &
mkdir config &
echo exports.SECRET = `${Math.random()}`; > config/config.js &
npm run setup &
echo ^@echo off >> ../cresGen2Proto.bat &
echo cd cresGen2Proto ^& >> ../cresGen2Proto.bat
echo startCresGen2Proto.bat >> ../cresGen2Proto.bat