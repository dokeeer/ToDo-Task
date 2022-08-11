export default function randomKeyGenerator() {
    const letters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let word = ''


    for (let i = 0; i < 15; i++) {
        word += letters.charAt(Math.floor(Math.random() * letters.length))
    }

    let randomKey = word.substr(0, 5) + '-' + word.substr(5, 5) + '-' + word.substr(10, 5)

    return randomKey.toUpperCase()
}

//
// Random Key Generator
//