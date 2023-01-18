indexCtrl = {}

indexCtrl.indexRender = (req, res) => {
    res.send('Home')
    //res.status(200).json({
    //  msg: 'Funcionando'
    //})
};

module.exports = indexCtrl;