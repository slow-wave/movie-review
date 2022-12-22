if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else { //로컬 환경이라면
    module.exports = require('./dev');
}