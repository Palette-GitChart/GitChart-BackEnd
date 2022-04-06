module.exports = {
    apps: [
        {
            name: 'githubCrawler',
            script: './index.js',
            instances: "max",
            exec_mode: 'cluster'
        }
    ]
};