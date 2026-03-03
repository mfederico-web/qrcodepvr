import { Resend } from 'resend';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check API key
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'API key non configurata' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { to, user, password, referralQR, pdfBase64, pdfFilename } = req.body;

    if (!to || !user || !password || !referralQR) {
      return res.status(400).json({ error: 'Campi obbligatori mancanti' });
    }

    const emailHtml = `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background: #f5f5f5;">
  
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: #000000; padding: 30px; text-align: center;">
      <img src="https://www.daznbet.it/external_css/DAZNBET/logo.png" alt="DAZNBET" style="height: 50px;">
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 30px; color: #333; line-height: 1.7;">
      
      <h1 style="font-size: 24px; font-weight: bold; color: #000; margin-bottom: 20px; text-align: center;">BENVENUTO SU DAZNBET.IT!</h1>
      
      <p style="font-size: 15px; color: #555; margin-bottom: 25px;">
        Da ora sei ufficialmente un nostro collaboratore! Ti forniamo di seguito gli indirizzi e gli accessi al tuo conto operatore e una serie di informazioni utili al tuo operato.
      </p>
      
      <p style="text-align: center;">
        <a href="https://www.daznbet.it" style="display: inline-block; background: #f7ff1a; color: #000; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; font-size: 14px;">Vai al Sito DAZN Bet</a>
      </p>
      
      <!-- Credenziali -->
      <div style="background: linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%); border-left: 4px solid #f7ff1a; padding: 20px 25px; margin: 25px 0; border-radius: 0 8px 8px 0;">
        <p style="margin: 10px 0; font-size: 15px;"><strong style="color: #000; display: inline-block; width: 120px;">User:</strong> <span style="color: #333; font-family: 'Courier New', monospace; font-weight: bold; background: #fff; padding: 3px 10px; border-radius: 4px; border: 1px solid #ddd;">${user}</span></p>
        <p style="margin: 10px 0; font-size: 15px;"><strong style="color: #000; display: inline-block; width: 120px;">Password:</strong> <span style="color: #333; font-family: 'Courier New', monospace; font-weight: bold; background: #fff; padding: 3px 10px; border-radius: 4px; border: 1px solid #ddd;">${password}</span></p>
        <p style="margin: 10px 0; font-size: 15px;"><strong style="color: #000; display: inline-block; width: 120px;">Referral URL:</strong></p>
        <p style="margin: 5px 0;"><a href="${referralQR}" style="color: #2563eb; font-size: 13px; word-break: break-all;">${referralQR}</a></p>
      </div>
      
      <!-- Avviso documenti -->
      <div style="background: #fff8e6; border: 1px solid #f0d78c; padding: 15px 20px; border-radius: 8px; font-size: 13px; color: #8a6d00; margin: 20px 0;">
        <strong style="color: #5c4900;">Importante:</strong> Qualora tu abbia mandato per l'apertura del conto l'autocertificazione, hai <strong>20 giorni</strong> dalla ricezione di questa e-mail per inviare i documenti in originale. Al termine di questo periodo l'operatività del tuo conto verrà bloccata in attesa dei documenti richiesti.
      </div>
      
      <p style="font-size: 12px; color: #888;">
        I documenti identificativi possono essere inviati:
      </p>
      <ul style="font-size: 12px; color: #888;">
        <li>Via mail all'indirizzo <strong>assistenza@daznbet.it</strong></li>
        <li>Tramite tasto UPLOAD nella sezione CONTRATTI della WEBPDC</li>
      </ul>
      
      <!-- Coordinate Bancarie -->
      <div style="margin: 30px 0; padding-top: 25px; border-top: 1px solid #eee;">
        <div style="font-size: 14px; font-weight: bold; color: #000; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">Coordinate Bancarie</div>
        
        <div style="background: #fafafa; padding: 20px; border-radius: 8px; font-size: 13px; color: #555; margin: 15px 0;">
          <p style="margin: 8px 0;"><strong style="color: #333;">Banca:</strong> Banco Posta</p>
          <p style="margin: 8px 0;"><strong style="color: #333;">Intestatario:</strong> SCOMMETTENDO SRL</p>
          <p style="margin: 8px 0;"><strong style="color: #333;">IBAN:</strong> IT51Y0760115900000071650618</p>
          <p style="margin: 8px 0;"><strong style="color: #333;">BIC:</strong> BPPIITRRXXX</p>
          <p style="margin: 8px 0;"><strong style="color: #333;">Filiale:</strong> POSTE ITALIANE SPA - P.ZZA VITTORIA, 10 BRINDISI 72100</p>
        </div>
        
        <div style="background: #fafafa; padding: 20px; border-radius: 8px; font-size: 13px; color: #555; margin: 15px 0;">
          <p style="margin: 8px 0;"><strong style="color: #333;">Bollettino Postale</strong></p>
          <p style="margin: 8px 0;"><strong style="color: #333;">Intestatario:</strong> Scommettendo srl</p>
          <p style="margin: 8px 0;"><strong style="color: #333;">C.C. N°:</strong> 71650618</p>
          <p style="margin: 8px 0;"><strong style="color: #333;">Indirizzo:</strong> Via Massimo D'Azeglio 1A, San Michele Salentino (BR)</p>
        </div>
      </div>
      
      <!-- Dati Fatturazione -->
      <div style="margin: 30px 0; padding-top: 25px; border-top: 1px solid #eee;">
        <div style="font-size: 14px; font-weight: bold; color: #000; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">Dati per Fatturazione Elettronica</div>
        <p style="font-size: 12px; color: #888; margin-bottom: 15px;">
          Qualora non avesse delegato la nostra società ad emettere le fatture a suo conto, riportiamo di seguito i dati per l'emissione:
        </p>
        
        <div style="background: #fafafa; padding: 20px; border-radius: 8px; font-size: 13px; color: #555; margin: 15px 0;">
          <p style="margin: 8px 0;"><strong style="color: #333;">Denominazione:</strong> SCOMMETTENDO S.R.L.</p>
          <p style="margin: 8px 0;"><strong style="color: #333;">Partita IVA:</strong> 02037070741</p>
          <p style="margin: 8px 0;"><strong style="color: #333;">Codice Fiscale:</strong> 02037070741</p>
          <p style="margin: 8px 0;"><strong style="color: #333;">Indirizzo:</strong> Via Massimo D'Azeglio, 1A - 72018 San Michele Salentino (BR)</p>
          <p style="margin: 8px 0;"><strong style="color: #333;">PEC:</strong> scommettendo.it@pec.it</p>
          <p style="margin: 8px 0;"><strong style="color: #333;">Codice Destinatario:</strong> X2PH38J</p>
        </div>
      </div>
      
      <div style="background: #fff8e6; border: 1px solid #f0d78c; padding: 15px 20px; border-radius: 8px; font-size: 13px; color: #8a6d00; margin: 20px 0;">
        <strong style="color: #5c4900;">N.B.</strong> I Punti che opereranno in regime forfettario dovranno cortesemente farlo presente tempestivamente.
      </div>
      
      <p style="text-align: center; font-size: 18px; margin: 30px 0;">
        <strong>Buon lavoro!</strong>
      </p>
      
    </div>
    
    <!-- CTA -->
    <div style="background: #000; padding: 25px 30px; text-align: center;">
      <p style="color: #fff; margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">EFFETTUA LA TUA PRIMA RICARICA</p>
      <a href="https://www.daznbet.it" style="display: inline-block; background: #f7ff1a; color: #000; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-weight: bold; font-size: 14px;">Accedi al tuo conto</a>
      <p style="font-size: 12px; color: #888; margin-top: 15px;">
        Per qualsiasi dubbio o chiarimento contatta un nostro operatore in <strong style="color: #f7ff1a;">CHAT LIVE</strong>
      </p>
    </div>
    
    <!-- Footer -->
    <div style="background: #1a1a1a; padding: 25px 30px; text-align: center;">
      <p style="color: #fff; font-size: 12px; font-weight: bold; margin: 0 0 10px 0;">CONCESSIONE ADM 16041</p>
      <p style="color: #888; font-size: 11px; margin: 0;">
        Il gioco è vietato ai minori di 18 anni e può causare dipendenza patologica.<br>
        Consulta le probabilità di vincita su www.daznbet.it
      </p>
    </div>
    
  </div>
  
</body>
</html>
    `;

    const emailOptions = {
      from: 'DAZNBET Contratti <contratti@daznbet.it>',
      to: to,
      subject: 'Benvenuto su DAZNBET.IT - Credenziali Conto Operatore',
      html: emailHtml,
    };

    // Add PDF attachment if provided
    if (pdfBase64 && pdfFilename) {
      emailOptions.attachments = [
        {
          filename: pdfFilename,
          content: pdfBase64,
        },
      ];
    }

    const data = await resend.emails.send(emailOptions);
    
    console.log('Email sent successfully:', data);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      error: error.message || 'Errore invio email',
      details: error.toString()
    });
  }
}
