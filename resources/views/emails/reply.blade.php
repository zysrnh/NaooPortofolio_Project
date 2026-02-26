<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Re: {{ $originalMessage->subject ?: 'Pesan kamu' }}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #D1E8FF;
      font-family: 'Courier New', Courier, monospace;
      padding: 40px 16px;
    }

    .wrapper {
      max-width: 600px;
      margin: 0 auto;
    }

    /* ── Header ── */
    .header {
      background-color: #0B1957;
      border: 4px solid #0B1957;
      padding: 28px 32px;
      box-shadow: 8px 8px 0 #9ECCFA;
    }

    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .brand {
      font-size: 20px;
      font-weight: 900;
      color: #9ECCFA;
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }

    .badge {
      background: #9ECCFA;
      color: #0B1957;
      font-size: 10px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 4px 12px;
      border: 2px solid #9ECCFA;
    }

    .header-greeting {
      font-size: 13px;
      color: #D1E8FF;
      font-weight: 700;
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .header-name {
      font-size: 22px;
      font-weight: 900;
      color: #F8F3EA;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 4px;
    }

    /* ── Subject strip ── */
    .subject-strip {
      background: #9ECCFA;
      border-left: 4px solid #0B1957;
      border-right: 4px solid #0B1957;
      padding: 12px 32px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .subject-label {
      font-size: 10px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #0B1957;
      opacity: 0.6;
      white-space: nowrap;
    }

    .subject-value {
      font-size: 13px;
      font-weight: 900;
      text-transform: uppercase;
      color: #0B1957;
      letter-spacing: 0.05em;
    }

    /* ── Body card ── */
    .body-card {
      background: #F8F3EA;
      border: 4px solid #0B1957;
      border-top: none;
      padding: 32px;
      box-shadow: 8px 8px 0 #0B1957;
    }

    .section-label {
      font-size: 10px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #0B1957;
      opacity: 0.4;
      margin-bottom: 12px;
    }

    .message-box {
      background: white;
      border: 3px solid #0B1957;
      padding: 20px 22px;
      font-size: 14px;
      font-weight: 600;
      color: #0B1957;
      line-height: 1.8;
      box-shadow: 4px 4px 0 #D1E8FF;
      white-space: pre-wrap;
    }

    /* ── Original message quote ── */
    .divider {
      border: none;
      border-top: 3px solid #0B1957;
      margin: 28px 0;
      opacity: 0.15;
    }

    .quote-label {
      font-size: 10px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #0B1957;
      opacity: 0.35;
      margin-bottom: 10px;
    }

    .quote-box {
      border-left: 4px solid #9ECCFA;
      background: #EAF4FF;
      padding: 14px 18px;
      font-size: 12px;
      font-weight: 600;
      color: #0B1957;
      line-height: 1.7;
      opacity: 0.75;
    }

    /* ── Footer ── */
    .footer {
      background: #0B1957;
      border: 4px solid #0B1957;
      border-top: none;
      padding: 20px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 8px 8px 0 #9ECCFA;
    }

    .footer-brand {
      font-size: 14px;
      font-weight: 900;
      color: #9ECCFA;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .footer-sub {
      font-size: 10px;
      font-weight: 700;
      color: #D1E8FF;
      opacity: 0.5;
      text-transform: uppercase;
      margin-top: 3px;
    }

    .footer-date {
      font-size: 11px;
      font-weight: 700;
      color: #9ECCFA;
      opacity: 0.6;
      text-align: right;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* ── Bottom note ── */
    .bottom-note {
      text-align: center;
      margin-top: 20px;
      font-size: 10px;
      font-weight: 700;
      color: #0B1957;
      opacity: 0.4;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Header -->
    <div class="header">
      <div class="header-top">
        <div class="brand">Naoo.id</div>
        <div class="badge">Reply</div>
      </div>
      <div class="header-greeting">Halo,</div>
      <div class="header-name">{{ $originalMessage->name }}</div>
    </div>

    <!-- Subject strip -->
    <div class="subject-strip">
      <span class="subject-label">Re:</span>
      <span class="subject-value">{{ $originalMessage->subject ?: 'Pesan kamu' }}</span>
    </div>

    <!-- Body -->
    <div class="body-card">
      <div class="section-label">Balasan</div>
      <div class="message-box">{{ $replyBody }}</div>

      <!-- Original message quote -->
      <hr class="divider" />
      <div class="quote-label">Pesan Asli</div>
      <div class="quote-box">{{ $originalMessage->message }}</div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div>
        <div class="footer-brand">Naoo.id</div>
        <div class="footer-sub">Portfolio &amp; Contact</div>
      </div>
      <div class="footer-date">
        {{ now()->locale('id')->translatedFormat('d M Y') }}<br/>
        {{ now()->format('H:i') }} WIB
      </div>
    </div>

    <div class="bottom-note">
      Email ini dikirim sebagai balasan atas pesan yang kamu kirimkan melalui Naoo.id
    </div>

  </div>
</body>
</html>