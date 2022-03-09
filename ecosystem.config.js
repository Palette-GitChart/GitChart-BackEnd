module.exports = {
    apps: [
        {
            name: 'githubCrawler',
            script: './index.js',
            instances: 4,
            exec_mode: 'cluster'
        }
    ]
};