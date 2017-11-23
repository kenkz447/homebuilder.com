window.baseUrl = 'http://localhost:31414/'

import a from 'shared/core'

// Import main
import initStartup from 'shared/startup'

initStartup()

if (module.hot) {
    module.hot.accept(['shared/startup'], () => {
        const nextStartup = require('shared/startup')['default']
        nextStartup()
    })
} 