import { useContext } from 'react';
import { UptickContext } from '../contexts/UptickContext';

export function useUptickHook() {
    const context = useContext(UptickContext);

    return context;
}