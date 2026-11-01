export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Method not allowed'
    });
  }

  try {
    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body)
        : req.body || {};

    const contact = String(body.contactInput || body.contact || '').trim();
    const contactType = String(body.contactType || body.contact_type || 'email').toLowerCase();
    const consent = body.hasConsented ?? body.consent ?? true;

    if (!contact || contact.length > 254) {
      return res.status(400).json({
        error: 'Please enter a valid contact.',
        message: 'Please enter a valid contact.'
      });
    }

    if (!['email', 'telegram', 'whatsapp'].includes(contactType)) {
      return res.status(400).json({
        error: 'Invalid contact type.',
        message: 'Invalid contact type.'
      });
    }

    if (!consent) {
      return res.status(400).json({
        error: 'Consent is required.',
        message: 'Consent is required.'
      });
    }

    if (
      contactType === 'email' &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
    ) {
      return res.status(400).json({
        error: 'Please enter a valid email address.',
        message: 'Please enter a valid email address.'
      });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY;

    if (supabaseUrl && secretKey) {
      try {
        await fetch(
          `${supabaseUrl}/rest/v1/early_access_requests`,
          {
            method: 'POST',
            headers: {
              apikey: secretKey,
              Authorization: `Bearer ${secretKey}`,
              'Content-Type': 'application/json',
              Prefer: 'return=minimal'
            },
            body: JSON.stringify({
              contact,
              contact_type: contactType,
              consent: true,
              source: 'ascend_finance_website'
            })
          }
        );
      } catch (err) {
        console.warn('Supabase forward skipped or failed:', err);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Request received successfully.'
    });

  } catch (error: any) {
    console.error('Lead registration error:', error);
    return res.status(500).json({
      error: 'Something went wrong.',
      message: error?.message || 'Something went wrong. Please try again.'
    });
  }
}
