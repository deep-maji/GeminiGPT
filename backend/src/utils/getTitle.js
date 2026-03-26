function extractTitle(str) {
  let strArr = str.split("\n\n");
  return strArr.find((ele) => {
    if (ele.startsWith("**")) {
      return ele;
    }
  })
}

export default extractTitle;
