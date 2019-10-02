const UserModel = require('../models/UserModel');
const SpotModel = require('../models/SpotModel');

module.exports = {
    async index(req, res) {
        const { tech } = req.query;

        const spots = await SpotModel.find({ techs: tech });

        return res.json(spots);
    },

    async store(req, res) {
        const { filename } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;

        const user = await UserModel.findById(user_id);

        if (!user) {
            return res.status(400).json({ error: `User doesn't exists!` });
        }

        let spot = await SpotModel.findOne({
            company,
            price,
        });

        if (!spot) {
            spot = await SpotModel.create({
                user: user_id,
                thumbnail: filename,
                company,
                price,
                techs: techs.split(',').map(tech => tech.trim()),
            })
        }

        return res.json(spot);
    },
};