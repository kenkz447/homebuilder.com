// window.baseUrl = 'https://localhost:44336/'
window.baseUrl = 'http://test.homebuilder.vn/'

import '../style/app.scss'

// Import main
import initStartup from 'shared/startup'

initStartup()

if (module.hot) {
    module.hot.accept(['shared/startup'], () => {
        const nextStartup = require('shared/startup')['default']
        nextStartup()
    })
} 