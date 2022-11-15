module.exports = {
  apps: [
    {
      name: "JCWD-2000-01", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.jsx",
      env: {
        NODE_ENV: "production",
        PORT: 8000,
      },
      time: true,
    },
  ],
};
