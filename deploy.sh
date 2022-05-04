# Pulling latest changes from remote and update NPM packages
echo "Pulling latest changes from remote..."
git pull
echo "Updating NPM packages..."
npm install

# Restart the bot
echo "Restarting bot..."
npm run stop
npm run delete
npm run start
pm2 logs