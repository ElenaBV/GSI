#  Файл выпонняет установку sequelize для postgres, express, ReactSSR
# Для того что бы все сработало:
# 1) chmod +x plan.sh
# 2) ./plan.sh


npm init -y
npm i express nodemon dotenv bcrypt express-session session-file-store react react-dom @babel/core @babel/preset-env @babel/preset-react @babel/register
npm i -D morgan eslint
npm install --save sequelize pg pg-hstore
npm install --save-dev sequelize-cli
mkdir -p src/{routers,views/components,views/pages,middlewares,lib,controllers} public/{css,js}
touch .prettierrc .sequelizerc .babelrc .env .envexample src/app.js
npm init @eslint/config

echo "require('dotenv').config()
const path = require('path');

 module.exports = {
 'config': path.resolve('db', 'config', 'dbconfig.json'),
 'models-path': path.resolve('db', 'models'),
 'seeders-path': path.resolve('db', 'seeders'),
 'migrations-path': path.resolve('db', 'migrations')
 };" > .sequelizerc;

npx sequelize init;

echo '{
  "development": {
    "use_env_variable": "DATABASE"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}' > ./db/config/dbconfig.json;


echo ' PORT=3000
DATABASE=postgres://postgres:123@localhost:5432/{название базы}
SECRET_KEY_SESSION=secret_key_SeSsIoN_2' > .env 

echo '  {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  }' > .babelrc


# раскоментируй после выполнения скрипта и вставь в файлы!

#  - .prettierrc

# ```js
# {
#   "tabWidth": 2,
#   "useTabs": false,
#   "singleQuote": true
# }

#   - .eslintrc.json

#   rules: {
#     'react/function-component-definition': 'off',
#     'import/no-extraneous-dependencies': 'off',
#     'react/prop-types': 'off',
#     'import/prefer-default-export': 'off',
#     'jsx-a11y/label-has-associated-control': 'off',
#   },

# - package.json

# ```js
# // код для копирования
# "scripts": {
"start":"node src/app.js",
"test":"jest test",
"dev": "nodemon src/app.js --ext js,jsx --ignore sessions"
#  },

