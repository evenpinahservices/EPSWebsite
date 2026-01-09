import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const stepsToReproduce = formData.get('stepsToReproduce') as string
    const expectedBehavior = formData.get('expectedBehavior') as string
    const actualBehavior = formData.get('actualBehavior') as string
    const deviceInfoStr = formData.get('deviceInfo') as string
    const screenshot = formData.get('screenshot') as string | null
    
    // Parse device info
    let deviceInfo
    try {
      deviceInfo = JSON.parse(deviceInfoStr || '{}')
    } catch {
      deviceInfo = {}
    }

    // Collect attachments
    const attachments: { name: string; size: number }[] = []
    let index = 0
    while (formData.get(`attachment_${index}`)) {
      const file = formData.get(`attachment_${index}`) as File
      attachments.push({
        name: file.name,
        size: file.size,
      })
      index++
    }

    // Create timestamp for unique file names
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const reportId = `bug-${Date.now()}`

    // Set up directories
    const bugReportsDir = path.join(process.cwd(), 'bug-reports')
    const screenshotsDir = path.join(bugReportsDir, 'screenshots')

    // Create directories if they don't exist
    if (!existsSync(bugReportsDir)) {
      await mkdir(bugReportsDir, { recursive: true })
    }
    if (!existsSync(screenshotsDir)) {
      await mkdir(screenshotsDir, { recursive: true })
    }

    // Save screenshot if provided
    let screenshotPath: string | null = null
    if (screenshot) {
      // Extract base64 data (remove data:image/png;base64, prefix if present)
      const base64Data = screenshot.includes(',') 
        ? screenshot.split(',')[1] 
        : screenshot
      
      const screenshotFilename = `${reportId}-screenshot.png`
      screenshotPath = path.join(screenshotsDir, screenshotFilename)
      
      // Convert base64 to buffer and save
      const buffer = Buffer.from(base64Data, 'base64')
      await writeFile(screenshotPath, buffer)
      
      // Store relative path for JSON
      screenshotPath = `screenshots/${screenshotFilename}`
    }

    // Create bug report object
    const bugReport = {
      id: reportId,
      title,
      description,
      stepsToReproduce,
      expectedBehavior,
      actualBehavior,
      deviceInfo,
      screenshot: screenshotPath,
      attachments: attachments.length > 0 ? attachments : null,
      timestamp: new Date().toISOString(),
      url: deviceInfo.url || 'Unknown',
    }

    // Save bug report as JSON
    const reportFilename = `${reportId}.json`
    const reportPath = path.join(bugReportsDir, reportFilename)
    await writeFile(reportPath, JSON.stringify(bugReport, null, 2), 'utf-8')

    console.log(`Bug report saved: ${reportPath}`)
    if (screenshotPath) {
      console.log(`Screenshot saved: ${path.join(bugReportsDir, screenshotPath)}`)
    }

    // Example: Send email notification (uncomment and configure when ready)
    /*
    if (process.env.RESEND_API_KEY) {
      const { Resend } = require('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      
      await resend.emails.send({
        from: 'bug-reports@evenpinah.com',
        to: 'natanel@evenpinah.com', // Your email
        subject: `Bug Report: ${title}`,
        html: `
          <h2>New Bug Report</h2>
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Description:</strong> ${description}</p>
          <p><strong>Steps to Reproduce:</strong> ${stepsToReproduce || 'N/A'}</p>
          <p><strong>Expected:</strong> ${expectedBehavior || 'N/A'}</p>
          <p><strong>Actual:</strong> ${actualBehavior || 'N/A'}</p>
          <p><strong>Device Info:</strong></p>
          <pre>${JSON.stringify(deviceInfo, null, 2)}</pre>
          <p><strong>URL:</strong> ${deviceInfo.url || 'Unknown'}</p>
          <p><strong>Timestamp:</strong> ${bugReport.timestamp}</p>
        `,
      })
    }
    */

    // Example: Create GitHub issue (uncomment and configure when ready)
    /*
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
      const [owner, repo] = process.env.GITHUB_REPO.split('/')
      const github = require('@octokit/rest')
      const octokit = new github.Octokit({ auth: process.env.GITHUB_TOKEN })
      
      await octokit.rest.issues.create({
        owner,
        repo,
        title: `[Bug] ${title}`,
        body: `
## Description
${description}

## Steps to Reproduce
${stepsToReproduce || 'N/A'}

## Expected Behavior
${expectedBehavior || 'N/A'}

## Actual Behavior
${actualBehavior || 'N/A'}

## Device Information
- Browser: ${deviceInfo.browser}
- Platform: ${deviceInfo.platform}
- Screen: ${deviceInfo.screenResolution}
- Viewport: ${deviceInfo.viewportSize}
- URL: ${deviceInfo.url}

## Timestamp
${bugReport.timestamp}
        `,
        labels: ['bug', 'user-reported'],
      })
    }
    */

    return NextResponse.json(
      { success: true, message: 'Bug report submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing bug report:', error)
    return NextResponse.json(
      { success: false, message: 'Error processing bug report' },
      { status: 500 }
    )
  }
}

