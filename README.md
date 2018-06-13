# [Issue 187](https://github.com/pact-foundation/pact-js/issues/187)

## Installation

```bash
yarn install
```

## How to reproduce

1. Run `yarn test` a couple of times, like 2 or 3. Test always passes. _(NOTE: I didn't fix it to work with `--watch` so don't use it)._

2. Open up `src/api.test.js`. You will see the following commented lines:

```
  beforeAll(async () => {
  // beforeEach(async () => {
```

```
  afterAll(async () => {
  // afterEach(async () => {
```

```
  'Content-Type': Matchers.regex({
    generate: 'application/json; charset=utf-8',
    matcher: 'application\/json',
  }),
  // 'Content-Type': 'application/json',
```

As you can see, using `beforeAll`, `afterAll`, and the regex for the response Content-Type header works.

3. Change the commented lines to the following:

```
  // beforeAll(async () => {
  beforeEach(async () => {
```

```
  // afterAll(async () => {
  afterEach(async () => {
```

4. Run again `yarn test`. It throws an error saying
> An interaction with same description ("a users request") and provider state (nil) but a different response headers has already been used.

If we remove the pact file with `rm pacts/my-consumer-my-provider.json` and then run `yarn test`, it **succeeds** the first time. If we run `yarn test` once again, it **throws the same error**.

5. Last, let's change the other commented line:

```
  // 'Content-Type': Matchers.regex({
  //   generate: 'application/json; charset=utf-8',
  //   matcher: 'application\/json',
  // }),
  'Content-Type': 'application/json',
```

If we run `yarn test` it **throws the same error**.

If we remove the pact file with `rm pacts/my-consumer-my-provider.json` and then run `yarn test`, it **succeeds** always every time we calls it.
