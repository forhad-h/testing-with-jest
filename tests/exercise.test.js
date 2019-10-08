const lib = require('../exercise1')

describe('FizzBuzz', () => {
  it('should throw an exception if the input is not a number', () => {
    const args = [null, undefined, {}, 'a']

    args.forEach(arg => {
      expect(() => {
        lib.fizzBuzz(arg)
      }).toThrow()
    })
  })

  it('should return FizzBuzz if the input is divisible with 3 and 5', () => {
    const result = lib.fizzBuzz(15)
    expect(result).toBe('FizzBuzz')
  })
  it('should return Fizz if the input is divisible only with 3', () => {
    const result = lib.fizzBuzz(3)
    expect(result).toBe('Fizz')
  })
  it('should return Buzz if the input is divisible only with 5', () => {
    const result = lib.fizzBuzz(5)
    expect(result).toBe('Buzz')
  })
  it('should return input in it is not divisible by 3 or 5', () => {
    const input = 1
    const result = lib.fizzBuzz(input)
    expect(result).toBe(input)
  })
})
