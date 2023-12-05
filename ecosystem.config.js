module.exports = {
  apps: [
    {
      name: "yourfarm-mobile-webadmin",
      script: "./index.js",
    },
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "3.7.12.160",
      key: "~/animeta-internal-new.pem",
      ref: "origin/main",
      repo: "git@github.com:yourfarmadmin/yourfarm-mobile-webadmin.git",
      path: "/home/ubuntu/yourfarm-mobile-webadmin",
      "post-deploy":
        "npm install && npm run build --verbose && pm2 serve build 3000 --spa",
    },
    testing: {
      user: "ubuntu",
      host: "test.yourfarm.co.in",
      key: "~/animeta-test-server.pem",
      ref: "origin/release-1.7.0",
      repo: "git@webadmin-repo:yourfarmadmin/yourfarm-mobile-webadmin.git",
      path: "/home/ubuntu/yourfarm-mobile-webadmin",
      "post-deploy":
        "npm install && npm run build --verbose && pm2 serve build 3000 --spa",
    },
  },
};
