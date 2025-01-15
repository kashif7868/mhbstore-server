const PeeralsService = require('./service');

exports.addSignUpBonus = async (req, res) => {
  try {
    const { userId } = req.body;
    const peerals = await PeeralsService.addSignUpBonus(userId);
    res.status(200).json({ success: true, message: 'Sign-Up Bonus credited', peerals });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.addShoppingBonus = async (req, res) => {
  try {
    const { userId, spentAmount } = req.body;
    const peerals = await PeeralsService.addShoppingBonus(userId, spentAmount);
    res.status(200).json({ success: true, message: 'Shopping Bonus credited', peerals });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.redeemPeerals = async (req, res) => {
  try {
    const { userId, redeemAmount } = req.body;
    const peerals = await PeeralsService.redeemPeerals(userId, redeemAmount);
    res.status(200).json({ success: true, message: 'Peerals redeemed', peerals });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getPeeralsDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const peerals = await PeeralsService.getPeeralsDetails(userId);
    res.status(200).json({ success: true, peerals });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
