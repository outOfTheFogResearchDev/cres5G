git clone https://github.com/outOfTheFogResearchDev/cresGen2Proto &
cd cresGen2Proto &
mkdir config &
echo exports.SECRET = `${Math.random()}`; > config/config.js &
npm run setup &
echo ./cresGen2Proto/startCresGen2Proto.bat >> ../cresGen2Proto.bat