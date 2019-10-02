const BookingModel = require('../models/BookingModel');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        let booking = await BookingModel.findOne({
            user: user_id,
            spot: spot_id,
            date,
        });

        if (!booking) {
            booking = await BookingModel.create({
                user: user_id,
                spot: spot_id,
                date,
            })
        }

        await booking.populate('spot').populate('user').execPopulate();

        return res.json(booking);
    }
}