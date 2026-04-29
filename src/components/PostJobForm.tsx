// components/PostJobForm.tsx
import React, { useState } from 'react'
import supabase from '../lib/supabase'
import PricingSection from './PricingSection'
import type { PlanType } from '../hooks/useLemonSqueezy'

type Step = 'form' | 'pricing' | 'success'
interface JobData {
  title: string; company: string; location: string; job_type: string
  salary_min: string; salary_max: string; description: string
  requirements: string; apply_url: string; tags: string; is_remote: boolean
}
const INIT: JobData = {
  title:'',company:'',location:'Remote',job_type:'Full-time',
  salary_min:'',salary_max:'',description:'',requirements:'',
  apply_url:'',tags:'',is_remote:true
}

export default function PostJobForm() {
  const [step, setStep] = useState<Step>('form')
  const [form, setForm] = useState<JobData>(INIT)
  const [jobId, setJobId] = useState<string|null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string|null>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    const {name,value,type} = e.target
    setForm(p => ({...p,[name]:type==='checkbox'?(e.target as HTMLInputElement).checked:value}))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(null); setSaving(true)
    try {
      const {data:{user}} = await supabase.auth.getUser()
      const {data,error:err} = await supabase.from('jobs').insert({
        ...form,
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
        tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean),
        user_id: user?.id ?? null,
        payment_status:'unpaid', status:'pending'
      }).select('id').single()
      if (err) throw err
      setJobId(data.id); setStep('pricing')
    } catch(e:unknown) { setError((e as Error).message??'Error') }
    finally { setSaving(false) }
  }

  if (step==='success') return (
    <div className="post-job-success">
      <div className="post-job-success__icon">🎉</div>
      <h2>Almost there!</h2>
      <p>Complete payment in the new tab. Your job goes live automatically.</p>
      <p className="post-job-success__id">Job ID: <code>{jobId}</code></p>
      <button className="btn btn-secondary" onClick={()=>{setStep('form');setForm(INIT);setJobId(null)}}>Post another job</button>
    </div>
  )

  if (step==='pricing') return (
    <div className="post-job-pricing">
      <button className="btn-ghost" onClick={()=>setStep('form')}>← Edit job details</button>
      <PricingSection jobId={jobId??undefined} onSelectPlan={()=>setStep('success')}/>
    </div>
  )

  return (
    <form className="post-job-form" onSubmit={onSubmit} noValidate>
      <h2>Post a Web3 Job</h2>
      {error && <div className="post-job-form__error" role="alert">{error}</div>}
      <div className="form-row">
        <div className="form-group"><label>Job Title *</label><input name="title" required placeholder="Senior Solidity Developer" value={form.title} onChange={onChange}/></div>
        <div className="form-group"><label>Company *</label><input name="company" required placeholder="Uniswap Labs" value={form.company} onChange={onChange}/></div>
      </div>
      <div className="form-row">
        <div className="form-group"><label>Job Type</label>
          <select name="job_type" value={form.job_type} onChange={onChange}>
            {['Full-time','Part-time','Contract','Freelance','Internship'].map(t=><option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="form-group"><label>Location</label><input name="location" placeholder="Remote / New York" value={form.location} onChange={onChange}/></div>
      </div>
      <div className="form-row">
        <div className="form-group"><label>Salary Min (USD)</label><input name="salary_min" type="number" placeholder="80000" value={form.salary_min} onChange={onChange}/></div>
        <div className="form-group"><label>Salary Max (USD)</label><input name="salary_max" type="number" placeholder="150000" value={form.salary_max} onChange={onChange}/></div>
      </div>
      <div className="form-group"><label>Description *</label><textarea name="description" required rows={6} placeholder="Describe the role..." value={form.description} onChange={onChange}/></div>
      <div className="form-group"><label>Requirements</label><textarea name="requirements" rows={4} placeholder="Skills, experience..." value={form.requirements} onChange={onChange}/></div>
      <div className="form-row">
        <div className="form-group"><label>Apply URL *</label><input name="apply_url" type="url" required placeholder="https://company.com/apply" value={form.apply_url} onChange={onChange}/></div>
        <div className="form-group"><label>Tags (comma separated)</label><input name="tags" placeholder="Solidity, DeFi, Ethereum" value={form.tags} onChange={onChange}/></div>
      </div>
      <div className="form-group form-group--checkbox">
        <input name="is_remote" type="checkbox" checked={form.is_remote} onChange={onChange}/>
        <label>This is a remote position</label>
      </div>
      <button type="submit" className="btn btn-primary" disabled={saving}>{saving?'Saving...':'Continue to Payment →'}</button>
    </form>
  )
}
