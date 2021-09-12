import ParserUtil from './util'
import Parser from './parser'


export default (command: string) => new Parser(new ParserUtil({ command }));


