let connectionDao = {
    protocol: 'http',
    address: 'localhost',
    port: '3000',
    getUrl: () => {
        return `${connectionDao.protocol}://${connectionDao.address}:${connectionDao.port}`;
    }
}