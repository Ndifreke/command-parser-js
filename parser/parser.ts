import ParserUtil from "./util";

class Parser {
    private parserData: ParserUtil

    constructor(parser: ParserUtil) {
        this.parserData = parser
    }

    getFlagArgument(flag: string) {
        return this.parserData.parser().flags[flag]
    }

    getFlags() {
        return Object.keys(this.toJs().parser().flags)
    }

    getBin() {
        return this.parserData.parser().bin
    }

    getCommands() {
        return this.parserData.parser().command
    }

    toJs() {
        return this.parserData
    }

}

export default Parser
