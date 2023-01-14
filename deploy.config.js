module.exports = {
  apps: [
    {
      name: "JCWDVL-007-01", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8701,
      },
      time: true,
    },
  ],
};
