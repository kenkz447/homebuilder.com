import { AllHTMLAttributes } from 'react'
import { LayoutBreakPoints } from '../constants'

export interface LayoutProps extends AllHTMLAttributes<any> {
    currentLayoutBreakPoint?: LayoutBreakPoints
}