import { TargetVariable } from "../../types/SourceTargetTypes";

export default function isTargetVariable(target: unknown): target is TargetVariable {
    if (target && typeof target === 'object' && typeof (target as TargetVariable).key === 'string') {
        if (typeof (target as TargetVariable).variable === 'string') {
            return ["variable", "number", "date", "currency"].includes((target as TargetVariable).variable)
        }
    }
   return false;
}