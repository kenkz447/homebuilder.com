import { Action } from 'redux'
import { PageOption } from '../types'

export interface PageChangeAction extends Action {
    pageOptions: PageOption
}