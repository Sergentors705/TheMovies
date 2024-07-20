const requestMaker = async (req, setter, arg) => {
  await fetch(req, {
    headers: {
      Authorization:
      `Bearer ${process.env.REACT_APP_TOKEN}`,
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((object) => {
      if (arg) {
        setter(object.arg)
      } else {
        setter(object)
      }
    })
}

export default requestMaker
