export function print(param1, param2) {
    if (param1 === undefined) {
        param1 = "";
    }
    if (param2 === undefined) {
        param2 = "";
    }

    document.writeln(param1 + param2 + "<br/>");
}