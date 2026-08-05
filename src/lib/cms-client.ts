/* Client-side form submission helpers — no server-only deps */

export async function submitEnquiry(data: Record<string, string>) {
  try {
    const body = {
      subject: data.subject || 'General Inquiry',
      name: data.name || '',
      company: data.company || '',
      email: data.email || '',
      phone: data.phone || '',
      message: data.message || '',
      status: 'new',
    }
    const res = await fetch('/api/cms/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return { error: !res.ok }
  } catch {
    return { error: true }
  }
}

export async function submitApplication(data: Record<string, string>) {
  try {
    const res = await fetch('/api/cms/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: 'Job Application - ' + (data.position || 'General'),
        name: data.name || '',
        company: '',
        email: data.email || '',
        phone: '',
        message: data.message || 'Applied for: ' + (data.position || 'General'),
        status: 'new',
      }),
    })
    return { error: !res.ok }
  } catch {
    return { error: true }
  }
}
