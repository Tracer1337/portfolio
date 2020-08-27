export const PROJECTS = "PROJECTS"

export default function format(type) {
    let fn

    if (type === PROJECTS) {
        fn = data => data.data.sort((a, b) => a.position - b.position)
    }

    return (data) => {
        return new Promise(resolve => {
            fn(data)
            resolve(data)
        })
    }
}