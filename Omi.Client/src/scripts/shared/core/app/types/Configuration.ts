import { autobind } from 'core-decorators'

import concat = require('lodash/concat')
import merge = require('lodash/merge')
import map = require('lodash/map')

import { ViewRoute, CRModule } from '../../types'

import { createAppReducer, createAppStore } from '../state'
import { IConfiguration } from './IConfiguration'

import { AppInit } from '../init'

export class Configuration implements IConfiguration {
    routes: Array<ViewRoute> = []
    sagaMiddleWares = []
    reducers = {}
    layouts = {}
    baseUrl = ''
    supportLanguages = []
    
    constructor() {

    }

    @autobind
    useModule(crModule: CRModule) {
        if(crModule.routes)
            this.routes = concat(this.routes, crModule.routes)
        
        if (crModule.middlewares)
            this.sagaMiddleWares = concat(this.sagaMiddleWares, crModule.middlewares.sagas)
        
        if (crModule.supportedLanguages)
            this.supportLanguages = concat(crModule.supportedLanguages)
        
        this.reducers = merge(this.reducers, crModule.reducers)
        this.layouts = merge(this.layouts, crModule.masterPages)
    }

    @autobind
    useModules(modules: Array<CRModule>) {
        map(modules, (module) => { this.useModule(module) })
    }

    @autobind
    createStore() {
        const reducer = createAppReducer(this.reducers)
        const store = createAppStore(this.sagaMiddleWares, reducer)
        return store
    }
    
    @autobind
    appInit() {
        AppInit(this)
    }
}