module.exports = {
    apps: [
        {
            name: 'githubCrawler',
            script: './index.js',
            instances: 0,
            exec_mode: 'cluster'
        }
    ]
};