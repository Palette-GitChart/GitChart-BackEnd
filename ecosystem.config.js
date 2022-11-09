module.exports = {
    apps: [
        {
            name: 'gitchart-backend',
            script: './index.js',
            instances: "max",
            exec_mode: 'cluster'
        }
    ]
};