import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/twilio';

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().max(150).optional().default(''),
  email: z.string().trim().email().max(150),
  phone: z.string().trim().max(50).optional().default(''),
  service: z.string().trim().max(100).optional().default(''),
  message: z.string().trim().min(1).max(2000),
});

// Twilio göndərən nömrəsi: production üçün biznes nömrəsi Twilio-da
// WhatsApp Business kimi təsdiqlənməlidir. Sandbox rejimində
// whatsapp:+14155238886 istifadə olunur.
const WHATSAPP_FROM = 'whatsapp:+14155238886';
const WHATSAPP_TO = 'whatsapp:+994516524945';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  const TWILIO_API_KEY = Deno.env.get('TWILIO_API_KEY');
  if (!LOVABLE_API_KEY || !TWILIO_API_KEY) {
    console.error('LOVABLE_API_KEY and/or TWILIO_API_KEY not configured');
    return new Response(
      JSON.stringify({ error: 'WhatsApp göndərmə xidməti hələ konfiqurasiya olunmayıb.' }),
      { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Yanlış sorğu formatı.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: 'Məlumatlar düzgün doldurulmayıb.', details: parsed.error.flatten().fieldErrors }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  const { name, company, email, phone, service, message } = parsed.data;

  const text = [
    'Yeni müraciət - metric.az',
    `Ad: ${name}`,
    `Şirkət: ${company || '-'}`,
    `E-poçt: ${email}`,
    `Telefon: ${phone || '-'}`,
    `Xidmət: ${service || '-'}`,
    `Mesaj: ${message}`,
  ].join('\n');

  const response = await fetch(`${GATEWAY_URL}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': TWILIO_API_KEY,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      To: WHATSAPP_TO,
      From: WHATSAPP_FROM,
      Body: text,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Twilio gateway failed [${response.status}]: ${errorBody}`);
    return new Response(
      JSON.stringify({ error: 'Mesaj göndərilə bilmədi.', status: response.status }),
      { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  const data = await response.json();
  return new Response(JSON.stringify({ ok: true, sid: data.sid ?? null }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
