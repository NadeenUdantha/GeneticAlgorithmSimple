const ga = require('./ga3.js')
const sz = 1e3
const randp = () => Math.floor(Math.random() * sz)

ga.run({
    instances: 5,
    max_gen: sz*1e2,
    max_score: sz,
    strx: sz*1e-1,
    create: () => {
        return Array(sz).fill().map(x => Math.random() > .9 ? 1 : 0)
    },
    score: x => {
        return x.reduce((v, x) => v + x, 0)
    },
    crossover: ([a, b, c]) => {
        const crossOverPoint = randp()
        for (let i = 0; i < sz; i++)
            c[i] = sz < crossOverPoint ? a[i] : b[i]
    },
    mutation: x => {
        if (!(Math.random() < .2))
            return
        let v = randp()
        x[v] = x[v] ? 0 : 1
    },
    str: x => x.join('')
})
