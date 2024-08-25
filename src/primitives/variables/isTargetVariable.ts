import { TargetVariable } from "../../config/types/SourceTargetTypes";

export default function isTargetVariable(target: unknown): target is TargetVariable {
    if (typeof (target as TargetVariable).key === 'string') {
        if (typeof target === 'object' && target && typeof (target as TargetVariable).variable === 'string') {
            return ["variable", "number", "date", "currency"].includes((target as TargetVariable).variable)
        }
    }
   return false;
}