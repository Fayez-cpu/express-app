import 'dotenv/config';
import { startups } from '../data/data.js'
import { db } from '../database/connect';

export const getAllData = async (req, res) => {
  try{
  const users =  await db.one('INSERT INTO users (email,name) VALUES ($1, $2) RETURNING *', ["aug@st.com", "me"] )
  return res.json(users)
  }
  catch(error){
    console.log(error)
  }
  let filteredData = startups

  const { industry, country, continent, is_seeking_funding, has_mvp } = req.query

  if (industry) {
    filteredData = filteredData.filter(startup =>
      startup.industry.toLowerCase() === industry.toLowerCase()
    )
  }

  if (country) {
    filteredData = filteredData.filter(startup =>
      startup.country.toLowerCase() === country.toLowerCase()
    )
  }

  if (continent) {
    filteredData = filteredData.filter(startup =>
      startup.continent.toLowerCase() === continent.toLowerCase()
    )
  }

  if (is_seeking_funding) {
    filteredData = filteredData.filter(startup =>
      startup.is_seeking_funding === JSON.parse(is_seeking_funding.toLowerCase())
    )
  }

  if (has_mvp) {
    filteredData = filteredData.filter(startup =>
      startup.has_mvp === JSON.parse(has_mvp.toLowerCase())
    )
  }

  res.json(filteredData)

}