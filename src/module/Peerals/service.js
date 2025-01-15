const Peerals = require('./entity/model');

exports.addSignUpBonus = async (userId) => {
  let peeralsAccount = await Peerals.findOne({ userId });

  if (!peeralsAccount) {
    // Creating a new account with 200 peerals for sign-up
    peeralsAccount = new Peerals({ userId, peeralsBalance: 200 });
    peeralsAccount.transactions.push({
      type: 'Sign-Up Bonus',
      amount: 200,
      details: 'Sign-up reward credited'
    });
  } else {
    throw new Error('Sign-Up Bonus already awarded');
  }

  await peeralsAccount.save();
  return peeralsAccount;
};

exports.addShoppingBonus = async (userId, spentAmount) => {
  const peeralsAccount = await Peerals.findOne({ userId });

  if (!peeralsAccount) {
    throw new Error('Peerals account not found for this user');
  }

  // Calculate the bonus (5% of the spent amount)
  const peeralsEarned = Math.floor((spentAmount * 5) / 100);

  peeralsAccount.peeralsBalance += peeralsEarned;
  peeralsAccount.transactions.push({
    type: 'Shopping Bonus',
    amount: peeralsEarned,
    details: `Earned from Rs.${spentAmount} shopping`
  });

  await peeralsAccount.save();
  return peeralsAccount;
};

exports.redeemPeerals = async (userId, redeemAmount) => {
  const peeralsAccount = await Peerals.findOne({ userId });

  if (!peeralsAccount) {
    throw new Error('Peerals account not found for this user');
  }

  if (peeralsAccount.peeralsBalance < redeemAmount) {
    throw new Error('Insufficient Peerals balance');
  }

  peeralsAccount.peeralsBalance -= redeemAmount;
  peeralsAccount.transactions.push({
    type: 'Redemption',
    amount: -redeemAmount,
    details: 'Peerals redeemed for discount'
  });

  await peeralsAccount.save();
  return peeralsAccount;
};

exports.getPeeralsDetails = async (userId) => {
  const peeralsAccount = await Peerals.findOne({ userId });

  if (!peeralsAccount) {
    throw new Error('Peerals account not found for this user');
  }

  return peeralsAccount;
};
