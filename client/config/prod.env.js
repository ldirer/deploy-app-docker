'use strict'
module.exports = {
  NODE_ENV: '"production"',

  // See the single + double quotes above? https://forum.vuejs.org/t/unexpected-token-using-process-env/7070/2
  COMMIT_HASH: `'${process.env.COMMIT_HASH}'`,
  SENTRY_DSN: `'${process.env.SENTRY_DSN}'`,
  GOOGLE_ANALYTICS_TRACK_ID: `'${process.env.GOOGLE_ANALYTICS_TRACK_ID}'`
}
