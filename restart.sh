echo "Restarting bot..."
npm run stop
npm run delete
npm run start
pm2 logs