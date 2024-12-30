import { promises as fs } from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

async function readMetaFiles(dirPath: string): Promise<any> {
  try {
    const items = await fs.readdir(dirPath, { withFileTypes: true })
    let metaData = {}
    
    // Try to read _meta.json in current directory
    try {
      const metaPath = path.join(dirPath, '_meta.json')
      const metaContent = await fs.readFile(metaPath, 'utf-8')
      metaData = JSON.parse(metaContent)
    } catch (error) {
      // No _meta.json in this directory, continue
    }

    // Recursively read subdirectories
    for (const item of items) {
      if (item.isDirectory()) {
        const fullPath = path.join(dirPath, item.name)
        const subDirMeta = await readMetaFiles(fullPath)
        
        if (Object.keys(subDirMeta).length > 0) {
          metaData[item.name] = {
            ...(metaData[item.name] || {}),  // Preserve existing folder metadata
            children: subDirMeta             // Add subdirectory content as children
          }
        }
      }
    }

    return metaData
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
    return {}
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const pagesDir = path.join(process.cwd(), 'pages')
    const treeData = await readMetaFiles(pagesDir)
    
    res.status(200).json(treeData)
  } catch (error) {
    console.error('Error generating navigation tree:', error)
    res.status(500).json({ error: 'Failed to read navigation structure' })
  }
} 