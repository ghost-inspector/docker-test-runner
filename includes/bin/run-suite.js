#!/usr/bin/env node

const assert = require('assert')

function usageAndExit() {
  console.log(`Usage: ./run-suite.js suite-id '{"json": "params"}'`)
  process.exit(1)
}

async function main(suiteId, params='{}') {
  console.log('Params:', params)
  params = JSON.parse(params)

  // set up the client
  const apiKey = process.env.GI_API_KEY
  assert.ok(apiKey, 'GI_API_KEY must be present in the environment')
  const ghost = require('ghost-inspector')(apiKey)

  // validate the suite
  try {
    assert.ok(String(suiteId).match(/^[a-f\d]{24}$/))
  } catch (unused) {
    usageAndExit()
  }

  const [unused, passing] = await ghost.executeSuite(suiteId, params);
  return passing
}

main(process.argv[2], process.argv[3]).then((passing) => {
  if (passing) {
    process.exit(0)
  } else {
    process.exit(1)
  }
}).catch((error) => {
  console.error('Error executing suite:', error.message)
  process.exit(1)
})
