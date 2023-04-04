export default function shuffle (arr) {
    let len = arr.length
    for (let i=0; i<len-1; i++) {
        let ind = Math.floor(Math.random() * (len-i)) + i
       
        let temp = arr[ind]
        arr[ind] = arr[i]
        arr[i] = temp
    }
    return arr;
}