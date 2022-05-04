# Pulling latest changes from remote and update NPM packages
echo "Pulling latest changes from remote..."
git pull
echo "Updating NPM packages..."
npm install

# Restart the bot
bash ./restart.sh