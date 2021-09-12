export type ParsedResultType = {
    command: string[] ,
    flags: Record<string, {
        value: any,
        argument: any,
        dirty: any
    }>,
    bin: null | string,
}
