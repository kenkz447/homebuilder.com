import { Configuration } from './core/app'

// Import modules:
import { Module as App } from '../app'
import { Module as Account } from './modules/Account'
import { Module as FileAndMedia } from './modules/FileAndMedia'
import { Module as Admin } from '../admin'

function startup() {
    const configuration = new Configuration()

    configuration.useModule(Account)
    configuration.useModule(FileAndMedia)
    configuration.useModule(Admin)
    configuration.useModule(App)

    // Start app when your configuration done
    configuration.appInit()
}

export default startup