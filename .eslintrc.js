module.exports = {
  "extends": ["airbnb","eslint:recommended", "plugin:meteor/recommended"],
  "plugins": [
    "react",
    "meteor"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "meteor": true
  },
  "settings": {
    "import/resolver": "meteor"
  },
  "parser": "babel-eslint",
  "rules": {
    "strict": 0,
    "import/no-absolute-path": [
      "off"
    ],
    "import/no-extraneous-dependencies": [
      "off"
    ],
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx"]
    }]
  }
};