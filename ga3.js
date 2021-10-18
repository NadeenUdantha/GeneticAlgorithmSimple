
const selection = (xs, ss) => {
    let a = [-Infinity], b = [-Infinity], c = [Infinity], ci
    xs.forEach((v, i) => {
        if (a[0] < v[0]) {
            b = a
            a = v
        } else if (b[0] < v[0])
            b = v
        if (c[0] >= v[0]) {
            c = v
            ci = i
        }
    })
    return [a[1], b[1], c[1], a[0], c, ci]
}

module.exports.run = ({ create, score, crossover, mutation, str, instances, max_gen, max_score, strx }) => {
    const xs = Array(instances).fill()
    xs.forEach((v, i, xs) => {
        v = create()
        xs[i] = [score(v), v]
    })
    let gen = 0
    let sel
    //const dump = () => console.log(gen, sel[3], str(sel[0]))
    const dump = () => console.log(gen, sel[3], str(sel[0]), xs.map(x => str(x[1])).join(' '))
    while (gen++ < max_gen) {
        sel = selection(xs)
        if (!(gen % strx))
            dump()
        //if (sel[3] >= max_score)break
        crossover(sel)
        mutation(sel[2])
        sel[4][0] = score(sel[4][1])
    }
    dump()
}
