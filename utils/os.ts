import { execSync } from 'child_process'
import { platform } from 'os'

export default function getOs() {
  if (platform() == 'darwin') {
    return 'macos'
  }
  if (platform() == 'linux') {
    execSync('hostnamectl', (stdout) => {
      const data = JSON.parse(stdout.toString())
      console.log(data)
      return data.DefaultHostname
    })
  }

  return platform()
}
