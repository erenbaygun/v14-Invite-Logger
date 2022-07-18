module.exports = async (client) => {

    process.on('unhandledRejection', err => {
        if (err) {
            if (err.stack.includes('An invalid token was provided.')) {
                return client.logger.error('Geçersiz token, config.js dosyasını kontrol et.')
            } else if (err.stack.includes('Missing Permissions')) {
                return client.logger.error('Botun izinlerini yetersiz')
            } else {
                return client.logger.error(err.stack)
            }
        }
    });

    process.on('uncaughtException', err => {
        if (err.stack.includes('Promise { <pending> }')) return;
        return client.logger.error(err.stack)
    });

    process.on('warning', (err) => {
        client.logger.error(err.stack)
    })
}