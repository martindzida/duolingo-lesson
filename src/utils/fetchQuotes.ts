const fetchQuotes = async () => {
  const res = await fetch('https://api.quotable.io/quotes?maxLength=50')
  return res.json()
}

export default fetchQuotes
