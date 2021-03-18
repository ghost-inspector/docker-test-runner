#!/usr/bin/env node

const assert = require('assert')

function usageAndExit() {
  console.log(`Usage: ./run-test.js test-id '{"json": "params"}'`)
  process.exit(1)
}

async function main(testId, params='{}') {
  console.log('Params:', params)
  params = JSON.parse(params)

  // set up the client
  const apiKey = process.env.GI_API_KEY
  assert.ok(apiKey, 'GI_API_KEY must be present in the environment')
  const ghost = require('ghost-inspector')(apiKey)

  // validate the suite
  try {
    assert.ok(String(testId).match(/^[a-f\d]{24}$/))
  } catch (unused) {
    usageAndExit()
  }

  const [unused, passing, screenshotPassing] = await ghost.executeTest(testId, params);
  console.log('Got result:')
  console.log(' -> passing:', passing)
  console.log(' -> screenshotPassing', screenshotPassing)

  if (params.passingStatusKey === 'screenshotComparePassing') {
    return passing && screenshotPassing
  } else {
    return passing
  }
}

main(process.argv[2], process.argv[3]).then((passing) => {
  if (passing) {
    process.exit(0)
  } else {
    process.exit(1)
  }
}).catch((error) => {
  console.error('Error executing test:', error.message)
  process.exit(1)
})
