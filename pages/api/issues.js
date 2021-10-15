import hacktoberfest from 'hacktoberfest-issue-hunt'

export default async (req, res) => {
  const { GITHUB_TOKEN } = process.env
  const { language, limit, labels } = req.query

  const issues = await hacktoberfest({
    token: GITHUB_TOKEN,
    language,
    limit,
    labels
  })

  return res.status(200).send(issues)
}
