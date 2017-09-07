export type ClassNamePrimitive = string | number | boolean;
export type ClassNameObject = { [key: string]: boolean };
export type ClassNameFragment = ClassNamePrimitive | ClassNameObject | ClassNameFragmentList | null | undefined;
export interface ClassNameFragmentList extends Array<ClassNameFragment> { }

export default function classnamer(...args: ClassNameFragment[]) {
    let accum = "";
    for (let i = 0; i < arguments.length; i++) {
        let arg = arguments[i];
        if (!arg) {
            continue;
        }
        let argType = typeof arg;
        if (argType === "string" || argType === "number" || argType === "boolean") {
            accum += " " + arg;
        } else if (Array.isArray(arg)) {
            accum += " " + classnamer.apply(null, arg);
        } else {
            for (let key in arg) {
                if (arg[key]) {
                    accum += " " + key;
                }
            }
        }
    }
    return accum.substring(1);
}
