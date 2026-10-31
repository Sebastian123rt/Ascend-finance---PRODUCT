export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {
    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body)
        : req.body || {};

    const contact = String(body.contact || '').trim();
    const contactType = String(body.contact_type || '');
    const company = String(body.company || '').trim();
    const consent = body.consent === true;

    if (!contact || contact.length > 254) {
      return res.status(400).json({
        error: 'Please enter a valid contact.'
      });
    }

    if (!['email', 'telegram', 'whatsapp'].includes(contactType)) {
      return res.status(400).json({
        error: 'Invalid contact type.'
      });
    }

    if (!consent) {
      return res.status(400).json({
        error: 'Consent is required.'
      });
    }

    if (
      contactType === 'email' &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
    ) {
      return res.status(400).json({
        error: 'Please enter a valid email address.'
      });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const secretKey = process.env.SUPABASE_SECRET_KEY;

    if (!supabaseUrl || !secretKey) {
      return res.status(500).json({
        error: 'Server configuration is incomplete.'
      });
    }

    const response = await fetch(
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
          company: company || null,
          consent: true,
          source: 'ascend_finance_website'
        })
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Supabase error:', errorDetails);

      return res.status(502).json({
        error: 'Could not save your request. Please try again.'
      });
    }

    return res.status(201).json({
      success: true
    });

  } catch (error) {
    console.error('Early access error:', error);

    return res.status(500).json({
      error: 'Something went wrong. Please try again.'
    });
  }
}
