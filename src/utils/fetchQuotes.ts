const fetchQuotes = async () => {
  const res = await fetch('https://api.quotable.io/quotes')
  return res.json()
}

export default fetchQuotes
