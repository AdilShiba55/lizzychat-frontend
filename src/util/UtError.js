export const UtError = {
    getError(fieldName, errors) {
        return errors.find(item => item.name === fieldName)?.error;
    },
    getRule(fieldName, errors) {
        const element = errors?.find(item => item.name === fieldName)
        return [() => !element || element.error]
    }
}