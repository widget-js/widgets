import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import consola from 'consola'
import fs from 'fs-extra'
import latestVersion from 'latest-version'

const DEPENDENCY_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
] as const

type PackageJSON = {
  name?: string
  version?: string
} & Partial<Record<(typeof DEPENDENCY_FIELDS)[number], Record<string, string>>>

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..')
const WIDGETS_PACKAGE_DIR = path.resolve(__dirname, '..')

async function updateWorkspaceVersions() {
  const packagePath = path.join(WIDGETS_PACKAGE_DIR, 'package.json')
  const cwd = PROJECT_ROOT

  if (!await fs.pathExists(packagePath)) {
    consola.warn(`Package file not found: ${packagePath}, skip`)
    return
  }

  const packageJSON = await fs.readJSON(packagePath) as PackageJSON
  let changed = false

  for (const field of DEPENDENCY_FIELDS) {
    const deps = packageJSON[field]
    if (!deps) {
      continue
    }

    for (const dependencyName of Object.keys(deps)) {
      const currentVersion = deps[dependencyName]

      if (currentVersion !== 'workspace:*') {
        continue
      }

      consola.info(`Fetching latest version for ${dependencyName}...`)
      try {
        const npmVersion = await latestVersion(dependencyName)
        const targetVersion = `^${npmVersion}`
        consola.success(`${field}.${dependencyName}: ${currentVersion} -> ${targetVersion}`)
        deps[dependencyName] = targetVersion
        changed = true
      }
      catch (error) {
        consola.error(`Failed to fetch version for ${dependencyName}:`, error)
      }
    }
  }

  if (changed) {
    await fs.writeJSON(packagePath, packageJSON, { spaces: 2 })
    consola.success(`Updated ${packagePath}`)
    try {
      const relativePath = path.relative(cwd, packagePath) || 'package.json'
      execSync(`git add ${relativePath}`, { stdio: 'inherit', cwd })
      consola.success(`Staged ${relativePath}`)
    }
    catch (error) {
      consola.warn(`Failed to stage package.json:`, error)
    }
  }
  else {
    consola.info('No workspace:* dependencies found, nothing to update')
  }
}

updateWorkspaceVersions()
