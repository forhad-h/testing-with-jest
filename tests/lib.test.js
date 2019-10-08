const lib = require('../lib')

describe('absolute', () => {
  it('should return a positive number if input is positive', () => {
    const result = lib.absolute(1)
    expect(result).toBe(1)
  })

  it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-1)
    expect(result).toEqual(1)
  })

  it('should return a 0 if input is 0', () => {
    const result = lib.absolute(0)
    expect(result).toBe(0)
  })
})

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Forhad')

    expect(result).toMatch(/^[A-z0-9\!\s]+$/)
  })
})

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies()

    expect(result).toEqual(expect.arrayContaining(['EUR', 'AUD', 'USD']))
  })
})

describe('getProduct', () => {
  it('should return the product with given ID', () => {
    const result = lib.getProduct(1)

    expect(result).toMatchObject({ id: 1, price: 10 })
    expect(result).toHaveProperty('id', 1)
  })
})

describe('registerUser', () => {
  it('should throw when the username is falsy', () => {
    const args = [null, undefined, NaN, '', 0, false]

    args.forEach(arg => {
      expect(() => {
        lib.registerUser(arg)
      }).toThrow()
    })
  })

  it('should return a user object if valid username is passed', () => {
    const username = 'Forhad'
    const result = lib.registerUser(username)

    expect(result).toMatchObject({ username })
    expect(result.id).toBeGreaterThan(new Date().getTime() - 20000)
  })
})

const db = require('../db')
const mail = require('../mail')

describe('applyDiscount', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
    // Mock function
    db.getCustomerSync = customerId => {
      console.log('Fake reading customer...')
      return { id: customerId, points: 20 }
    }
    const order = { customerId: 1, totalPrice: 10 }
    lib.applyDiscount(order)
    expect(order.totalPrice).toBe(9)
  })
})

describe('notifyCustomer', () => {
  it('should send an email to the customer', () => {
    /*  // Manual implementation

    db.getCustomerSync = customerId => {
      return { email: 'a' }
    }

    let mailSent = false
    mail.send = (email, message) => {
      mailSent = true
    }

    lib.notifyCustomer({ customerId: 1 })
    expect(mailSent).toBe(true) */

    // mock function with jest's default features
    db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' })
    mail.send = jest.fn()

    lib.notifyCustomer({ customerId: 1 })
    // toHaveBeenCalled only works for jest.fn()
    // use toHaveBeenCalledWith(arg1, arg2, ...)
    expect(mail.send).toHaveBeenCalled()
    expect(mail.send.mock.calls[0][0]).toBe('a')
    expect(mail.send.mock.calls[0][1]).toMatch(/order/)
  })
})
