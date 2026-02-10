import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'

export default function ResumeComponent(){
  const [status, setStatus] = useState('')

  // resolved resume URL (profile.resume preferred, else local file)
  const resumeUrl = profile?.resume ?? '/resumeAsDocument.pdf'

  async function handleDownload(){
    setStatus('Preparing...')
    try{
      // Use absolute path (leading slash) so Vite serves from public/
      const res = await fetch(resumeUrl, { mode: 'cors' })
      if(res.ok){
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = (profile && profile.name ? profile.name.replace(/\s+/g,'_') : 'resume') + '.pdf'
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
        setStatus('Downloaded PDF')
        return
      } else {
        // non-ok response (404 etc.)
        console.warn('Resume fetch returned', res.status)
      }
    }catch(e){
      console.warn('Resume fetch error', e)
    }

    // Fallback: generate a plain-text resume and download it
    const lines = []
    if(profile){
      lines.push(profile.name || '')
      lines.push(profile.title || '')
      lines.push('\nSummary:')
      lines.push(profile.summary || '')

      if(Array.isArray(profile.experience)){
        lines.push('\nExperience:')
        profile.experience.forEach(exp => {
          lines.push(`- ${exp.role || ''} @ ${exp.company || ''} (${exp.period || ''})`)
          if(exp.details) lines.push(`  ${exp.details}`)
        })
      }

      if(Array.isArray(profile.skills)){
        lines.push('\nSkills:')
        lines.push(profile.skills.join(', '))
      }

      if(Array.isArray(profile.education)){
        lines.push('\nEducation:')
        profile.education.forEach(ed => lines.push(`- ${ed.degree || ''} (${ed.year || ''}) - ${ed.institute || ''}`))
      }
    } else {
      lines.push('Resume')
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = (profile && profile.name ? profile.name.replace(/\s+/g,'_') : 'resume') + '.txt'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    setStatus('Downloaded .txt fallback')
  }

  function saveToBrowser(){
    try{
      localStorage.setItem('lovebul_resume', JSON.stringify(profile || { name: 'No profile' }))
      setStatus('Saved to browser (localStorage)')
    }catch(e){
      setStatus('Failed to save to browser')
    }
  }

  function handleView(){
    window.open('/resume', '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="resume" className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white">Resume</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Download, view or save your resume locally</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button onClick={handleDownload} className="px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-glow hover:scale-105 transition-all duration-300">Download Resume</button>
            <button onClick={handleView} className="px-6 py-3 rounded-xl glass border-primary/20 hover:border-primary text-foreground font-bold transition-all duration-300">View Resume</button>
            <button onClick={saveToBrowser} className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-muted-foreground transition-all">Save in Browser</button>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          <strong>Status:</strong> {status}
        </div>

        <div className="mt-6">
          <p className="text-sm text-slate-700 dark:text-slate-300">Tip: For a proper PDF download, place a file named <code>resumeAsDocument.pdf</code> (or update <code>profile.resume</code>) in the <code>public/</code> folder of your project.</p>
        </div>
      </motion.div>
    </section>
  )
}
