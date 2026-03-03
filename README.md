# DAZNBET QR Code Generator

Tool per la generazione di QR Code per punti vendita DAZNBET con invio email automatico.

## Funzionalità

- ✅ Generazione QR Code con codice affiliato personalizzato
- ✅ Esportazione PDF A4 alta qualità
- ✅ Invio email automatico con credenziali e PDF allegato
- ✅ Template email professionale DAZNBET

## Setup su Vercel

### 1. Carica su GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TUO-USERNAME/daznbet-qr-generator.git
git push -u origin main
```

### 2. Deploy su Vercel

1. Vai su [vercel.com](https://vercel.com)
2. Clicca "Add New Project"
3. Importa il repository da GitHub
4. **IMPORTANTE:** Aggiungi la variabile d'ambiente:
   - Nome: `RESEND_API_KEY`
   - Valore: `[la tua API key di Resend]`
5. Clicca "Deploy"

### 3. Configurazione Variabili d'Ambiente

Su Vercel, vai su:
- Project Settings → Environment Variables
- Aggiungi: `RESEND_API_KEY` = `la-tua-api-key`

## Struttura Progetto

```
daznbet-qr-generator/
├── index.html          # Tool principale
├── api/
│   └── send-email.js   # Serverless function per invio email
├── package.json        # Dipendenze
└── README.md           # Questo file
```

## Autore

By Massimino Federico
