module.exports.getCustomerSync = id => {
  console.log('Reading a customer from MongoDB...')
  return { id, points: 11 }
}

module.exports.getCustomer = async id => {
  return new Promise((resolve, reject) => {
    console.log('Reading a customer from MongoDB...')
    resolve({ id, points: 11 })
  })
}
