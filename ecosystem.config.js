const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

module.exports = {
  apps: [
    {
      name: 'back',
      script: '/srv/back/current/start_back.sh',
      cwd: '/',
      time: true,
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      watch: false,
      max_memory_restart: '1G',
      env_preprod: {
        PORT: 3001,
        NODE_ENV: 'preprod',
        JWT_ISSUER: 'UnionistaShop',
        JWT_TTL: '12h',
        TYPEORM_MIGRATIONS_DIR: 'scripts/migrations',
      },
    },
    {
      name: 'front',
      script: '/srv/front/current/start_front.sh',
      cwd: '/',
      time: true,
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      watch: false,
      max_memory_restart: '1G',
      env_preprod: {
        PORT: 3000,
        NODE_ENV: 'preprod',
        JWT_ISSUER: 'UnionistaShop',
        JWT_TTL: '12h',
        TYPEORM_MIGRATIONS_DIR: 'scripts/migrations',
      },
    },
  ],
  deploy: {
    preprod: {
      user: 'root',
      ssh_options: 'StrictHostKeyChecking=no',
      host: '195.35.48.180',
      ref: 'origin/dev',
      key: 'deploy.key',
      repo: 'git@github.com:mohamedBENKHOUYA/unionista-back.git',
      path: '/srv/back',
      'post-deploy':
        'npm install && npm run build && pm2 kill && pm2 start ecosystem.config.js --env preprod --update-env && pm2 save',
    },
  },
};
