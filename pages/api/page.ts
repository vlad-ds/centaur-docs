import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pagePath } = req.query

  if (!pagePath || typeof pagePath !== 'string') {
    return res.status(400).json({ error: 'Page path is required' })
  }

  // Security: Prevent directory traversal
  const normalizedPath = path.normalize(pagePath).replace(/^(\.\.(\/|\\|$))+/, '')
  
  try {
    // Construct the full file path
    const fullPath = path.join(process.cwd(), 'pages', `${normalizedPath}.mdx`)
    
    // Verify the path is within the pages directory
    const pagesDir = path.join(process.cwd(), 'pages')
    if (!fullPath.startsWith(pagesDir)) {
      return res.status(403).json({ error: 'Invalid page path' })
    }

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'Page not found' })
    }

    // Read the file contents
    const content = fs.readFileSync(fullPath, 'utf-8')
    
    res.status(200).json({ content })
  } catch (error) {
    console.error('Error reading page:', error)
    res.status(500).json({ error: 'Failed to read page content' })
  }
} 