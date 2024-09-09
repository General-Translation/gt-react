export default function createComponentError(componentName: string) {
    return (params: any) => { throw new Error(`Using <${componentName}> on the client-side with props: ${JSON.stringify(params)}. Using <${componentName}> on the client-side is forbidden.`) }
}