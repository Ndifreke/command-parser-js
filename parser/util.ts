import { ParsedResultType } from "./type";

export default class ParserUtil {
    private command: string
    constructor({ command }: { command: string }) {
        this.command = command
    }

    /**
     * Check is a string is a commandLine flag
     * @param flag string to check if it is a flag
     * @returns boolean true if flag is a commandLine Flag
     */
    private isFlag(flag: string) {
        return /--\w+/.test(flag) || /-\w+/.test(flag)
    }

    /**
     * Get the argument that is passed for a command line flag
     * An example of git checkout -b branch-ame
     * branch-name in the above represent the argument passed to the -b flag
     * @param param0 {flag:string, command:string}
     * @returns string or null representing the argument or absense of argument
     * respectively
     */
    private getFlagArg({ flag, command }: { flag: string, command: string }) {
        const pattern = new RegExp(`[\\s](${flag})\\s([^\\s]+)`)
        const arg = pattern.exec(command)?.[2] || null
        return arg
    }

    /**
     * Get the command part assigment value and categorize it as either
     * command or flag
     * @param input string command part 
     * @returns Object {type:command|arg, value:string}
     */
    private getCommandPartValue(input: string) {
        if (this.isFlag(input)) {
            const [command, value] = input.split("=");
            return { type: "flag", value: { command, value } };
        }
        if (/w+/) {
            const [command, _] = input.split("=");
            return { type: "command", value: command };
        }
    };

    parser() {
        const inputCommand = this.command
        const parsedResult: ParsedResultType = { command: [], flags: {}, bin: null };
        const parts = inputCommand.split(/\s+/gi);
        const commandParts = Object.values(parts);
        parsedResult.bin = this.isFlag(commandParts[0]) ? null : commandParts[0]

        for (let value of commandParts.splice(0)) {
            const result = this.getCommandPartValue(value);
            if (result?.value && typeof result.value === 'string' && result?.type === "command") {
                parsedResult.command.push(result.value);
            }
            if (result?.type === 'flag') {
                const value = result.value
                //@ts-ignore
                const command = value.command
                const arg = this.getFlagArg({ flag: command, command: inputCommand })
                const argIsFlag = arg ? this.isFlag(arg) : false
                parsedResult.flags[command] = {
                    //@ts-ignore
                    value: value.value || null,
                    argument: argIsFlag ? null : arg,
                    dirty: arg

                }
            }
        }

        return parsedResult;
    }

}
