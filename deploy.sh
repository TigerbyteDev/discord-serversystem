# Pulling latest changes from remote and update NPM packages
echo "Pulling latest changes from remote..."
git pull
echo "Updating NPM packages..."
rm -rf ./node_modules
npm install

# Restart the bot
bash ./restart.sh