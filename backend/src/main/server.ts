import { pgHelper } from '../infra/postgres/helper/postgres-helper'

pgHelper.connect()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.error('❌ Error connecting to the database:', err)
  })
