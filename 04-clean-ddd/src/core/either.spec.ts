import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  }

  return left('error')
}

test('success result', () => {
  const result = doSomething(true)

  if (result.isRight()) {
    console.log('Success:', result.value)
  }

  expect(result.isRight()).toBeTruthy()
  expect(result.isLeft()).toBeFalsy()
})

test('error result', () => {
  const result = doSomething(false)

  expect(result.isRight()).toBeFalsy()
  expect(result.isLeft()).toBeTruthy()
})