export default function uniqueArrayFilter(arr, arg) {
    let set = [];
    arr.forEach((item) => {
      if (!set.includes(item[arg])) {
        set.push(item[arg]);
      }
    });
    arr = [];
    for (let value of set) arr.push(value);
    return set
}
