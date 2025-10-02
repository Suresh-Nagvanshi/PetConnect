const express = require('express');
const mongoose = require('mongoose');
const ServiceBooking = require('../models/ServiceBooking');

const router = express.Router();

async function hasConflict(vetId, appointmentTime) {
  const conflict = await ServiceBooking.findOne({
    vetId,
    appointmentTime: appointmentTime,
    status: { $in: ['pending', 'accepted'] },
  });
  return conflict !== null;
}

// GET: Fetch all appointments for a vet with booker info
router.get('/vet-appointments/:vetId', async (req, res) => {
  try {
    const vetId = req.params.vetId;

    const appointments = await ServiceBooking.aggregate([
      { $match: { vetId: new mongoose.Types.ObjectId(vetId) } },
      {
        $lookup: {
          from: 'buyers',
          localField: 'buyerId',
          foreignField: '_id',
          as: 'buyerInfo'
        }
      },
      {
        $lookup: {
          from: 'sellers',
          localField: 'sellerId',
          foreignField: '_id',
          as: 'sellerInfo'
        }
      },
      {
        $lookup: {
          from: 'vetservices',
          localField: 'serviceId',
          foreignField: '_id',
          as: 'serviceInfo'
        }
      },
      { $unwind: { path: '$serviceInfo', preserveNullAndEmptyArrays: true } },
      {
        $addFields: {
          booker: {
            $cond: [
              { $gt: [{ $size: '$buyerInfo' }, 0] },
              { $arrayElemAt: ['$buyerInfo', 0] },
              { $arrayElemAt: ['$sellerInfo', 0] }
            ]
          }
        }
      },
      {
        $project: {
          buyerInfo: 0,
          sellerInfo: 0,
        }
      },
      {
        $sort: { appointmentTime: 1 }
      }
    ]);

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// GET: Fetch appointments for a buyer
router.get('/buyer-appointments/:buyerId', async (req, res) => {
  try {
    const buyerId = req.params.buyerId;
    if (!mongoose.Types.ObjectId.isValid(buyerId)) {
      return res.status(400).json({ error: 'Invalid buyer ID' });
    }
    const bookings = await ServiceBooking.find({ buyerId: new mongoose.Types.ObjectId(buyerId) })
      .populate('serviceId vetId')
      .sort({ appointmentTime: 1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch buyer bookings' });
  }
});

// GET: Fetch appointments for a seller
router.get('/seller-appointments/:sellerId', async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({ error: 'Invalid seller ID' });
    }
    const bookings = await ServiceBooking.find({ sellerId: new mongoose.Types.ObjectId(sellerId) })
      .populate('serviceId vetId')
      .sort({ appointmentTime: 1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch seller bookings' });
  }
});

// POST: Create new booking
router.post('/', async (req, res) => {
  try {
    const { buyerId, sellerId, vetId, serviceId, appointmentTime } = req.body;

    if ((!buyerId && !sellerId) || !vetId || !serviceId || !appointmentTime) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const appointmentDateTime = new Date(appointmentTime);

    const conflictExists = await hasConflict(vetId, appointmentDateTime);
    if (conflictExists) {
      return res.status(409).json({ error: 'Appointment time conflicts with an existing booking.' });
    }

    const booking = new ServiceBooking({
      buyerId: buyerId || null,
      sellerId: sellerId || null,
      vetId,
      serviceId,
      appointmentTime: appointmentDateTime,
      status: 'pending',
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error('Booking creation error:', err);
    res.status(500).json({ error: 'Server error during booking creation' });
  }
});

// PUT: Update booking status
router.put('/:id', async (req, res) => {
  try {
    const { status, declineReason } = req.body;
    if (!['pending', 'accepted', 'declined'].includes(status)) {
      return res.status(400).json({ error: 'Invalid booking status' });
    }

    const updateData = { status };
    if (status === 'declined') {
      updateData.declineReason = declineReason || 'No reason provided';
    } else {
      updateData.declineReason = '';
    }

    const updatedBooking = await ServiceBooking.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedBooking) return res.status(404).json({ error: 'Booking not found' });

    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: 'Error updating booking status' });
  }
});

// DELETE: Delete a booking (only if declined)
router.delete('/:id', async (req, res) => {
  try {
    const booking = await ServiceBooking.findById(req.params.id);
    console.log('Booking for deletion:', booking);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    if (booking.status !== 'declined') return res.status(403).json({ error: 'Only declined bookings can be deleted' });

    await ServiceBooking.findByIdAndDelete(booking._id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error('Deletion Error:', err);
    res.status(500).json({ error: 'Error deleting booking' });
  }
});


module.exports = router;
