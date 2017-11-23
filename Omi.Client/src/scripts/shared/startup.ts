import { Configuration } from './core/app'

// Import modules:
import { Module as App } from '../app'
import { Module as Account } from './modules/Account'

function startup() {
    const configuration = new Configuration()

    configuration.useModule(App)
    configuration.useModule(Account)
    
    // Start app when your configuration done
    configuration.appInit()
}

export default startup