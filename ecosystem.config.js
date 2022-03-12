module.exports = {
    apps : [{
      name: "quotes",
      script: "./server.js",
      instances: "1s",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }